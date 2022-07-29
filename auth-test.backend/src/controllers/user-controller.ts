import bcrypt from 'bcryptjs';
import express, { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { AuthErrorCodes } from '../core/consts/error-codes';
import { Roles } from '../core/consts/roles';
import { ApiError400, ApiError401, ApiError404 } from '../core/error-handler/models/client-errors';
import { User, UserDB, UserMongoose } from '../core/models/user';

type LoginUser = { email: string; password: string };
type RegisterUser = {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
};

const jwtMaxAge = 3 * 60 * 60; // 3h is sec

const convertUserDBToUserModel = (user: UserDB): User => ({
    id: user._id,
    email: user.email,
    role: user.role as Roles,
    lastName: user.lastName,
    firstName: user.firstName,
});

const createJWTToken = (user: User) =>
    process.env.JWT_SECRET && jwt.sign(user, process.env.JWT_SECRET, { expiresIn: jwtMaxAge });

const authorizeUser = (res: express.Response, user: UserDB) => {
    const userData = convertUserDBToUserModel(user);
    const token = createJWTToken(userData);

    res.cookie('jwt', token, { httpOnly: true });
    return res.status(200).send(userData);
};

const findUserByEmail = async (email: string): Promise<UserDB> => {
    const user = await UserMongoose.findOne({ email });
    if (!user) {
        throw new ApiError404(AuthErrorCodes.USER_NOT_FOUND);
    }

    return user;
};

const createUser = async ({ email, password, lastName, firstName }: RegisterUser) => {
    const user = await UserMongoose.create({
        email,
        password,
        lastName,
        firstName,
    });

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
            const { role } = decodedToken as User;
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

            const { email, firstName, id, lastName, role } = decodedToken as User;
            return res.status(200).json({ email, firstName, id, lastName, role });
        });
    } catch (error) {
        next(error);
    }
};

const getUserList: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserMongoose.find();
        return res.status(200).json(users.map(convertUserDBToUserModel));
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

export { login, logout, create, remove, getCurrentUser, getUserList, isUser, isAdmin, createAdmin };
