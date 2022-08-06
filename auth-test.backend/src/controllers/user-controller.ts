import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import express, { RequestHandler } from 'express';
import moment from 'moment';
import { MailOptions } from 'nodemailer/lib/smtp-transport';

import { Roles } from '../core/consts/roles';
import { UserDto } from '../core/models/user';
import { IUser, UserModel } from '../database/models/user';
import { IUserVerificationToken, UserVerificationTokenModel } from '../database/models/user-verification-token';
import { AuthErrorCodes } from '../error/consts/error-codes';
import { ApiError403 } from '../error/models/client-errors';
import {
    checkBannedList,
    checkPasswordValidity,
    convertUserToDto,
    createJWTToken,
    decodeJWTToken,
    findUserByEmail,
    validateUserByToken,
} from '../helpers/user.helper';
import MailerController from './mailer-controller';

type LoginForm = { email: string; password: string };
type RegisterForm = {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
};

const authorizeUser = async (res: express.Response, user: IUser): Promise<void> => {
    if (!user.verified) {
        throw new ApiError403(AuthErrorCodes.EMAIL_IS_NOT_VERIFIED);
    }

    await UserModel.updateOne({ _id: user._id }, { lastLogin: moment.utc().format() });

    const userDto: UserDto = convertUserToDto(user);
    const token: string = createJWTToken(userDto);

    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).send(userDto);
};

const login: RequestHandler = async (req, res, next) => {
    const formData: LoginForm = req.body;

    try {
        await checkBannedList(formData.email);
        const user: IUser = await findUserByEmail(formData.email);
        await checkPasswordValidity(formData.password, user.password);
        await authorizeUser(res, user);
    } catch (e) {
        next(e);
    }
};

const create: RequestHandler = async (req, res, next) => {
    const formData: RegisterForm = req.body;
    try {
        await checkBannedList(formData.email);
        const hash: string = await bcrypt.hash(formData.password, 10);
        const user: IUser = await UserModel.create({ ...formData, password: hash });

        const token: IUserVerificationToken = await UserVerificationTokenModel.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        });

        const options: MailOptions = {
            to: user.email,
            subject: 'Email Verification',
            html: `<p>Click <a href="http://${process.env.BASE_URL}/user/verify/${user._id}/${token.token}">here</a> to verify your email</p>`,
        };

        await MailerController.send(options);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
};

const verify: RequestHandler = async (req, res, next) => {
    const { userId, token } = req.body;
    try {
        const { user, verificationToken } = await validateUserByToken(userId, token);
        await UserModel.updateOne({ _id: user._id }, { verified: true });
        await UserVerificationTokenModel.findByIdAndRemove(verificationToken._id);
        await authorizeUser(res, user);
    } catch (e) {
        next(e);
    }
};

const logout: RequestHandler = (req, res, next) => {
    try {
        decodeJWTToken(req.cookies.jwt);
        res.clearCookie('jwt');
        res.status(200).send();
    } catch (e) {
        next(e);
    }
};

const getCurrentUser: RequestHandler = (req, res, next) => {
    try {
        const user: UserDto = decodeJWTToken(req.cookies.jwt);
        if (user) {
            res.status(200).json(user);
        }
    } catch (e) {
        next(e);
    }
};

const createAdmin = async () => {
    const hash = await bcrypt.hash('password', 10);

    await UserModel.create({
        firstName: 'Narek',
        lastName: 'Avagian',
        role: Roles.Admin,
        email: 'admin@g.com',
        password: hash,
        verified: true,
    });
};

const createUserMock = async (count: number) => {
    const hash = await bcrypt.hash('password', 10);
    for (let i = 0; i < count; i++) {
        await UserModel.create({
            firstName: 'Narek',
            lastName: 'Avagian',
            role: Roles.Basic,
            email: Math.round(10000 - 0.5 + Math.random() * (10000000 - 10000 + 1)) + '_user@g.com',
            password: hash,
            verified: true,
        });
    }
};

const UserController = { login, logout, create, verify, getCurrentUser, createAdmin, createUserMock };
export default UserController;
