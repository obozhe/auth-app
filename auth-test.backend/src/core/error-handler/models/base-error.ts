import HttpStatusCodes from '../../consts/http-status-codes';

export default class BaseError extends Error {
    public code: string;
    public status: HttpStatusCodes;
    public isOperational: boolean;
    public description: string;

    constructor(
        code: string,
        status: HttpStatusCodes,
        isOperational: boolean,
        description: string
    ) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.code = code;
        this.status = status;
        this.isOperational = isOperational;
        this.description = description;
        Error.captureStackTrace(this);
    }
}
