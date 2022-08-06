import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { UserDto } from '../core/models/user';
import { BannedUserModel, IBannedUser } from '../database/models/banned-user';
import { IUser, UserModel } from '../database/models/user';
import { convertUserToDto } from '../helpers/user.helper';

const getUsers: RequestHandler = async (req, res, next) => {
    const { filters } = req.body;
    try {
        const bannedUsers: string[] = (await BannedUserModel.find()).map(({ user }: IBannedUser) => String(user));

        const banListComparator: (user: IUser) => boolean = filters?.banned
            ? (user: IUser) => bannedUsers.includes(String(user._id))
            : (user: IUser) => !bannedUsers.includes(String(user._id));

        const users: UserDto[] = (await UserModel.find()).reduce(
            (users: UserDto[], user: IUser) => (banListComparator(user) ? [...users, convertUserToDto(user)] : users),
            []
        );

        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};

const getBannedUsers: RequestHandler = async (req, res, next) => {
    try {
        const bannedUsers: string[] = (await BannedUserModel.find()).map(({ user }: IBannedUser) => String(user));

        const users: UserDto[] = (await UserModel.find()).reduce(
            (users: UserDto[], user: IUser) =>
                bannedUsers.includes(String(user._id)) ? [...users, convertUserToDto(user)] : users,
            []
        );

        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};

const deleteUsers: RequestHandler = async (req, res, next) => {
    try {
        await UserModel.deleteMany({ _id: { $in: req.body } });
        return res.status(200).send();
    } catch (e) {
        next(e);
    }
};

const banUsers: RequestHandler = async (req, res, next) => {
    try {
        await BannedUserModel.create(req.body.map((id: string) => ({ user: new Types.ObjectId(id) })));
        return res.status(200).send();
    } catch (e) {
        next(e);
    }
};

const unBanUsers: RequestHandler = async (req, res, next) => {
    try {
        await BannedUserModel.deleteMany({ user: { $in: req.body } });
        return res.status(200).send();
    } catch (e) {
        next(e);
    }
};

const AdminController = { getUsers, getBannedUsers, deleteUsers, banUsers, unBanUsers };
export default AdminController;
