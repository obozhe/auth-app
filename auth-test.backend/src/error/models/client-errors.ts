import HttpStatusCodes from '../../core/consts/http-status-codes';
import { AuthErrorCodes } from '../consts/error-codes';
import BaseError from './base-error';

export class ApiError400 extends BaseError {
    constructor(errorCode: string) {
        super(errorCode, HttpStatusCodes.BAD_REQUEST, true);
    }
}

export class ApiError401 extends BaseError {
    constructor(errorCode: string) {
        super(errorCode, HttpStatusCodes.NOT_AUTHORIZED, true);
    }
}

export class ApiError403 extends BaseError {
    constructor(errorCode: string = AuthErrorCodes.FORBIDDEN) {
        super(errorCode, HttpStatusCodes.FORBIDDEN, true);
    }
}

export class ApiError404 extends BaseError {
    constructor(errorCode: string) {
        super(errorCode, HttpStatusCodes.NOT_FOUND, true);
    }
}
