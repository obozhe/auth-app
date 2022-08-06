import { RequestHandler } from 'express';

import { UserDto } from '../core/models/user';
import { checkAdminPermissions, checkBannedList, checkBasicPermissions, decodeJWTToken } from '../helpers/user.helper';

export const isAdmin: RequestHandler = async (req, res, next) => {
    const token: string = req.cookies.jwt;
    try {
        const user: UserDto = decodeJWTToken(token);
        await checkBannedList(user.email);
        checkAdminPermissions(user.role);
        next();
    } catch (e) {
        next(e);
    }
};

export const isUser: RequestHandler = async (req, res, next) => {
    const token: string = req.cookies.jwt;
    try {
        const user: UserDto = decodeJWTToken(token);
        await checkBannedList(user.email);
        checkBasicPermissions(user.role);
        next();
    } catch (e) {
        next(e);
    }
};
