import { AuthErrorCodes } from './error-codes';

const ErrorMessages: { [key: string]: string } = Object.freeze({
    [AuthErrorCodes.INVALID_PASSWORD]: 'Password is incorrect',
    [AuthErrorCodes.USER_NOT_FOUND]: "User doesn't exist",
    [AuthErrorCodes.USER_CREATION_FAILED]: 'User is not created',
    [AuthErrorCodes.NOT_AUTHORIZED]: "User isn't authorized",
});

export default ErrorMessages;