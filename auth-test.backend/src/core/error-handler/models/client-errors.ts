import HttpStatusCodes from '../../consts/http-status-codes';
import BaseError from './base-error';

export class ApiError404 extends BaseError {
    constructor(
        errorCode: string,
        description: string,
        status = HttpStatusCodes.NOT_FOUND,
        isOperational = true
    ) {
        super(errorCode, status, isOperational, description);
    }
}

export class ApiError400 extends BaseError {
    constructor(
        errorCode: string,
        description: string,
        status = HttpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(errorCode, status, isOperational, description);
    }
}
