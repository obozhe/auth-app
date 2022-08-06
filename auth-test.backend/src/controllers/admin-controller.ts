import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { UserDto } from '../core/models/user';
import { BannedUserModel, IBannedUser } from '../database/models/banned-user';
import { IUser, UserModel } from '../database/models/user';
import { convertUserToDto } from '../helpers/user.helper';

const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const bannedUsers: string[] = (await BannedUserModel.find()).map(({ user }: IBannedUser) => String(user));

        const users: UserDto[] = (await UserModel.find()).map((user: IUser) =>
            convertUserToDto(user, bannedUsers.includes(String(user._id)))
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

const AdminController = { getUsers, deleteUsers, banUsers, unBanUsers };
export default AdminController;
