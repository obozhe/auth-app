export default class BaseError extends Error {
    constructor(code, status, isOperational, description) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.code = code;
        this.status = status;
        this.isOperational = isOperational;
        this.description = description;
        Error.captureStackTrace(this);
    }
}
