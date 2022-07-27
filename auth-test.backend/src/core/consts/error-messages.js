import { AuthErrorCodes } from './error-codes.js';

const AuthErrorMessages = Object.freeze({
    [AuthErrorCodes.INVALID_PASSWORD]: 'Password is incorrect',
    [AuthErrorCodes.USER_NOT_FOUND]: "User doesn't exist",
    [AuthErrorCodes.USER_CREATION_FAILED]: 'User is not created',
});

export { AuthErrorMessages };
