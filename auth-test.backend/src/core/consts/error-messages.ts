import { AuthErrorCodes, MailerErrorCodes } from './error-codes';

const ErrorMessages: { [key: string]: string } = Object.freeze({
    [AuthErrorCodes.INVALID_PASSWORD]: 'Password is incorrect',
    [AuthErrorCodes.USER_NOT_FOUND]: "User doesn't exist",
    [AuthErrorCodes.USER_CREATION_FAILED]: 'User is not created',
    [AuthErrorCodes.NOT_AUTHORIZED]: "User isn't authorized",
    [AuthErrorCodes.INVALID_VERIFICATION_TOKEN]: "Token isn't valid",
    [AuthErrorCodes.EMAIL_NOT_UNIQUE]: 'User with entered email exists',
    [AuthErrorCodes.EMAIL_IS_VERIFIED]: 'Email is already verified',

    [MailerErrorCodes.MAIL_NOT_SENT]: 'Mail was not sent. Try again later',
});

export default ErrorMessages;
