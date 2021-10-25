import ErrorResponse from '../utils/errorResponse.js';
import { ERROR_CODE } from '../utils/errorCode.js';

// error response handler
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err?.message;

    // Log to console for dev
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(ERROR_CODE.RESOURCE_NOT_FOUND_WITH_ID);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        // const message = 'Duplicate field value entered';
        console.log(err, 'err')
        // const errors = Object.
        for (const [param, value] of Object.entries(err.keyValue)){
            console.log(param, value);
        }
        error = new ErrorResponse(ERROR_CODE.DATABASE_DUPLICATE_VALUE_ENTERED, [{param : Object.keys(err.keyValue)[0], msg: 'Duplicate field value entered'}]);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((val, key) => {
            return { msg: val.message, param: val.path, code: 0 };
        });
        error = new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors);
        // };
        // error = new ErrorResponse({ name: message, code: 0, statusCode: 400 });
    }

    // Mongoose general error
    if (err.name === 'MongooseError') {
        error = new ErrorResponse(ERROR_CODE.DATABASE_ERROR);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = new ErrorResponse(ERROR_CODE.INVALID_TOKEN);
    }

    if (err.name === 'TokenExpiredError') {
        error = new ErrorResponse(ERROR_CODE.TOKEN_EXPIRED);
    }


    // if (err.name === 'validation error') {
    //     var message = Object.values(err.errors).map(val => {
    //         val.msg;
    //         // message.param = val.param;
    //     });

    //     error = new ErrorResponse({name : err.name, code : 0, statusCode: 400}, message);
    // }


    return res.status(error.statusCode || 500).json({
        success: false,
        message: error?.name || 'Server Error',
        code: error?.code || 500,
        errors: error?.errors || null,
        // err : err?.name,

    });
}

export default errorHandler;