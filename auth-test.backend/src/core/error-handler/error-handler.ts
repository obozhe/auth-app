import { ErrorRequestHandler } from 'express';

import logger from '../loggers/logger';
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
    response.status(error.status || 500).json(error);
};

export { logError, isOperationalError, apiErrorHandler };
