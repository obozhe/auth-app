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
});

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
}

interface UserDB extends Omit<User, 'id' | 'role'> {
    _id: any;
    password: string;
    role: string;
}

const UserMongoose = Mongoose.model('user', UserSchema);

export { UserMongoose, User, UserDB };
