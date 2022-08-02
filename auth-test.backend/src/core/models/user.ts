import Joi from 'joi';
import Mongoose from 'mongoose';

import { Roles } from '../consts/roles';

const UserSchema = new Mongoose.Schema({
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
});

interface UserToken {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
}

interface User extends Omit<UserToken, 'id' | 'role'> {
    _id: any;
    password: string;
    role: string;
    verified: boolean;
}

const UserMongoose = Mongoose.model('user', UserSchema);

export { UserMongoose, UserToken, User };
