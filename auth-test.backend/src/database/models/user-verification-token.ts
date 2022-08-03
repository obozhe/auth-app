import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

interface IUserVerificationToken {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    token: string;
}

const userVerificationTokenSchema = new Schema<IUserVerificationToken>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

const UserVerificationTokenModel = mongoose.model(
    'userVerificationToken',
    userVerificationTokenSchema
);

export { UserVerificationTokenModel, IUserVerificationToken };
