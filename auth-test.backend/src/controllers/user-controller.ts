import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import express, { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { AuthErrorCodes } from '../core/consts/error-codes';
import { Roles } from '../core/consts/roles';
import { ApiError400, ApiError401, ApiError404 } from '../core/error-handler/models/client-errors';
import Token from '../core/models/token';
import { User, UserMongoose, UserToken } from '../core/models/user';
import MailerController from './mailer-controller';

type LoginUser = { email: string; password: string };
type RegisterUser = {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
};

const jwtMaxAge = 3 * 60 * 60; // 3h is sec

const convertUserToToken = (user: User): UserToken => ({
    id: user._id,
    email: user.email,
    role: user.role as Roles,
    lastName: user.lastName,
    firstName: user.firstName,
});

const createJWTToken = (user: UserToken) =>
    process.env.JWT_SECRET && jwt.sign(user, process.env.JWT_SECRET, { expiresIn: jwtMaxAge });

const authorizeUser = (res: express.Response, user: User) => {
    const userData = convertUserToToken(user);
    const token = createJWTToken(userData);

    res.cookie('jwt', token, { httpOnly: true });
    return res.status(200).send(userData);
};

const findUserByEmail = async (email: string): Promise<User> => {
    const user = await UserMongoose.findOne({ email });
    if (!user) {
        throw new ApiError404(AuthErrorCodes.USER_NOT_FOUND);
    }

    return user;
};

const createUser = async ({ email, password, lastName, firstName }: RegisterUser) => {
    const user = await UserMongoose.create({ email, password, lastName, firstName });

    if (!user) {
        throw new ApiError400(AuthErrorCodes.USER_CREATION_FAILED);
    }

    return user;
};

const checkPasswordValidity = async (password: string, userPassword: string) => {
    const isValid = await bcrypt.compare(password, userPassword);
    if (!isValid) {
        throw new ApiError400(AuthErrorCodes.INVALID_PASSWORD);
    }

    return isValid;
};

const isJWTContainsRoles = (roles: Roles[], token: string) => {
    if (!token) {
        throw new ApiError401(AuthErrorCodes.NOT_AUTHORIZED);
    }

    let isValid = false;
    jwt.verify(token, process.env.JWT_SECRET as string, {}, (err, decodedToken) => {
        if (err) {
            throw new ApiError401(AuthErrorCodes.NOT_AUTHORIZED);
        } else {
            const { role } = decodedToken as UserToken;
            if (roles.includes(role)) {
                isValid = true;
            } else {
                throw new ApiError401(AuthErrorCodes.NOT_AUTHORIZED);
            }
        }
    });

    return isValid;
};

const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body as LoginUser;
    try {
        const user = await findUserByEmail(email);
        await checkPasswordValidity(password, user.password);
        authorizeUser(res, user);
    } catch (error) {
        next(error);
    }
};

const create: RequestHandler = async (req, res, next) => {
    const { password } = req.body as RegisterUser;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await createUser({ ...req.body, password: hash });

        if (user) {
            const token = await Token.create({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            });

            const options = {
                to: user.email,
                subject: 'Email Verification',
                html: `<p>Click <a href="http://${process.env.BASE_URL}/user/verify/${user._id}/${token.token}">here</a> to verify your email</p>`,
            };

            await MailerController.send(options);
            res.status(200).send();
        }
    } catch (error) {
        next(error);
    }
};

const verify: RequestHandler = async (req, res, next) => {
    try {
        const user: User | null = await UserMongoose.findById(req.body.userId);
        if (!user) {
            throw new ApiError404(AuthErrorCodes.USER_NOT_FOUND);
        }

        if (user.verified) {
            throw new ApiError400(AuthErrorCodes.EMAIL_IS_VERIFIED);
        }

        const token = await Token.findOne({ userId: user._id, token: req.body.token });
        if (!token) {
            throw new ApiError400(AuthErrorCodes.INVALID_VERIFICATION_TOKEN);
        }

        await UserMongoose.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);

        authorizeUser(res, user);
    } catch (error) {
        next(error);
    }
};

const remove: RequestHandler = async (req, res, next) => {
    try {
        await UserMongoose.deleteMany({ _id: { $in: req.body.ids } });
        return res.status(200).send();
    } catch (error) {
        next(error);
    }
};

const logout: RequestHandler = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.JWT_SECRET as string, {}, (err) => {
            if (err) {
                throw new ApiError401(AuthErrorCodes.NOT_AUTHORIZED);
            }

            res.clearCookie('jwt');
            res.status(200).send();
        });
    } catch (error) {
        next(error);
    }
};

const getCurrentUser: RequestHandler = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.JWT_SECRET as string, {}, (err, decodedToken) => {
            if (err) {
                throw new ApiError401(AuthErrorCodes.NOT_AUTHORIZED);
            }

            return res.status(200).json(decodedToken);
        });
    } catch (error) {
        next(error);
    }
};

const getUserList: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserMongoose.find();
        return res.status(200).json(users.map(convertUserToToken));
    } catch (error) {
        next(error);
    }
};

const isAdmin: RequestHandler = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (isJWTContainsRoles([Roles.Admin], token)) {
            next();
        }
    } catch (error) {
        next(error);
    }
};

const isUser: RequestHandler = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (isJWTContainsRoles([Roles.Basic, Roles.Admin], token)) {
            next();
        }
    } catch (error) {
        next(error);
    }
};

const createAdmin = async () => {
    const hash = await bcrypt.hash('password', 10);

    await UserMongoose.create({
        firstName: 'Narek',
        lastName: 'Avagian',
        role: Roles.Admin,
        email: 'admin@g.com',
        password: hash,
    });
};

const createUserMock = async (count: number) => {
    const hash = await bcrypt.hash('password', 10);
    for (let i = 0; i < count; i++) {
        const random = Math.round(10000 - 0.5 + Math.random() * (10000000 - 10000 + 1));

        try {
            await UserMongoose.create({
                firstName: 'Narek',
                lastName: 'Avagian',
                role: Roles.Basic,
                email: random + '_user@g.com',
                password: hash,
            });
        } catch (e) {
            console.error(e);
        }
    }
};

export {
    login,
    logout,
    create,
    verify,
    remove,
    getCurrentUser,
    getUserList,
    isUser,
    isAdmin,
    createAdmin,
    createUserMock,
};
