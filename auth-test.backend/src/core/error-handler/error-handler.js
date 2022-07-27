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

// eslint-disable-next-line no-unused-vars
const apiErrorHandler = (error, request, response, _) => {
    logError(error);
    response.status(error.status || 500).json(error);
};

export { logError, isOperationalError, apiErrorHandler };
