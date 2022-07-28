import Mongoose from 'mongoose';

import Roles from '../consts/roles';

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
    _id: any;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

const UserMongoose = Mongoose.model('user', UserSchema);

export { UserMongoose, User };
