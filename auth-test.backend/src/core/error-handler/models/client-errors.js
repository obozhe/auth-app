import { HttpStatusCodes } from '../../consts/http-status-codes.js';
import BaseError from './base-error.js';

export class ApiError404 extends BaseError {
    constructor(
        errorCode,
        description,
        status = HttpStatusCodes.NOT_FOUND,
        isOperational = true
    ) {
        super(errorCode, status, isOperational, description);
    }
}

export class ApiError400 extends BaseError {
    constructor(
        errorCode,
        description,
        status = HttpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(errorCode, status, isOperational, description);
    }
}
