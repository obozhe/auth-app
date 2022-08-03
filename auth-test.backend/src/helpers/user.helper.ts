import bcrypt from 'bcryptjs';
import e from 'express';
import jwt from 'jsonwebtoken';

import { Roles } from '../core/consts/roles';
import { UserDto } from '../core/models/user';
import { BannedUserModel, IBannedUser } from '../database/models/banned-user';
import { IUser, UserModel } from '../database/models/user';
import { IUserVerificationToken, UserVerificationTokenModel } from '../database/models/user-verification-token';
import { AuthErrorCodes } from '../error/consts/error-codes';
import { ApiError400, ApiError401, ApiError403, ApiError404 } from '../error/models/client-errors';

const jwtMaxAge: number = 3 * 60 * 60; // 3h is sec

export const convertUserToDto = (user: IUser): UserDto => ({
    id: String(user._id),
    email: user.email,
    role: user.role as Roles,
    lastName: user.lastName,
    firstName: user.firstName,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
});

export const createJWTToken = (user: UserDto): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
    }

    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: jwtMaxAge });
};

export const decodeJWTToken = (token: string): UserDto => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
    }

    if (!token) {
        throw new ApiError401(AuthErrorCodes.NOT_AUTHORIZED);
    }

    let user: UserDto;
    try {
        user = jwt.verify(token, process.env.JWT_SECRET) as UserDto;
    } catch (e) {
        throw new ApiError401(AuthErrorCodes.NOT_AUTHORIZED);
    }

    return user;
};

export const checkBannedList = async (email: string): Promise<boolean> => {
    const bannedUser: IBannedUser | null = await BannedUserModel.findOne().populate<IUser>({
        path: 'user',
        match: { email: email },
    });
    if (bannedUser?.user) {
        throw new ApiError403(AuthErrorCodes.ACCOUNT_IS_BANNED);
    }

    return false;
};

export const findUserByEmail = async (email: string): Promise<IUser> => {
    const user: IUser | null = await UserModel.findOne({ email });
    if (!user) {
        throw new ApiError404(AuthErrorCodes.USER_NOT_FOUND);
    }

    return user;
};

export const checkPasswordValidity = async (password: string, userPassword: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, userPassword);
    if (!isValid) {
        throw new ApiError400(AuthErrorCodes.INVALID_PASSWORD);
    }

    return isValid;
};

export const checkAdminPermissions = (role: Roles): boolean => {
    if (![Roles.Admin].includes(role)) {
        throw new ApiError403();
    }

    return true;
};

export const checkBasicPermissions = (role: Roles): boolean => {
    if (![Roles.Admin, Roles.Basic].includes(role)) {
        throw new ApiError403();
    }

    return true;
};

export const validateUserByToken = async (
    userId: string,
    tokenHash: string
): Promise<{ verificationToken: IUserVerificationToken; user: IUser }> => {
    const user: IUser | null = await UserModel.findById(userId);
    if (!user) {
        throw new ApiError404(AuthErrorCodes.USER_NOT_FOUND);
    }

    if (user.verified) {
        throw new ApiError400(AuthErrorCodes.EMAIL_IS_ALREADY_VERIFIED);
    }

    const verificationToken: IUserVerificationToken | null = await UserVerificationTokenModel.findOne({
        userId: user._id,
        token: tokenHash,
    });
    if (!verificationToken) {
        throw new ApiError400(AuthErrorCodes.INVALID_VERIFICATION_TOKEN);
    }

    return { verificationToken, user };
};
