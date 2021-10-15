

class ErrorResponse extends Error {
    constructor(info, errors) {
        // console.log(error);
        super(info);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = info?.name || 'Something went wrong';
        this.code = info?.code || 'UNKNOWN_ERROR';
        this.statusCode = info?.statusCode || 500;
        this.errors = errors || null;
        Error.captureStackTrace(this, this.constructor);
    }
}


export default ErrorResponse;



