import { ErrorRequestHandler } from 'express';

import HttpStatusCodes from '../core/consts/http-status-codes';
import logger from '../core/loggers/logger';
import BaseError from './models/base-error';

function logError(error: any) {
    console.error(error);
    logger.error(error);
}

function isOperationalError(error: any) {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const apiErrorHandler: ErrorRequestHandler = (error, request, response, _) => {
    logError(error);

    switch (true) {
        case error.name === 'MongoServerError' && error.code === 11000:
            response
                .status(HttpStatusCodes.INTERNAL_ERROR)
                .json(new BaseError('11000', HttpStatusCodes.INTERNAL_ERROR, true, error.message));
            break;

        default:
            response.status(error.status || 500).json(error);
            break;
    }
};

export { logError, isOperationalError, apiErrorHandler };
