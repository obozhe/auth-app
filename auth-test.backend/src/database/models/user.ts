import moment from 'moment';
import Mongoose, { Types } from 'mongoose';

import { Roles } from '../../core/consts/roles';

interface IUser {
    _id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
    password: string;
    verified: boolean;
    createdAt: string;
    lastLogin: string;
}

const UserSchema = new Mongoose.Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    firstName: {
        type: String,
        minlength: 2,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 2,
        required: true,
    },
    role: {
        type: String,
        default: Roles.Basic,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: moment.utc().format(),
    },
    lastLogin: {
        type: String,
    },
});

const UserModel = Mongoose.model('user', UserSchema);

export { UserModel, IUser };
