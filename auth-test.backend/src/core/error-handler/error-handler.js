import logger from '../loggers/logger.js';
import BaseError from './models/base-error.js';

function logError(err) {
    console.error(err);
    logger.error(err);
}

function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}

const apiErrorHandler = (error, request, response, next) => {
    logError(error);
    response.status(error.status || 400).json(error);
};

export { logError, isOperationalError, apiErrorHandler };
