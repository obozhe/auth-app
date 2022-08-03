import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

interface IBannedUser {
    _id: Types.ObjectId;
    user: Types.ObjectId;
}

const bannedUserSchema = new Schema<IBannedUser>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});

const BannedUserModel = mongoose.model('bannedUser', bannedUserSchema);

export { BannedUserModel, IBannedUser };
