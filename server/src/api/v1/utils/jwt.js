import jwt from 'jsonwebtoken';
import ErrorResponse from './errorResponse.js';
import {ERROR_CODE} from './errorCode.js';


export const sign = (payload, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
}


export const decode = (token) => {
    return new Promise((resolve, reject) => {
        jwt.decode(token, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
}


export const getTokenFromHeaders = (headers) => {
    return new Promise((resolve, reject) => {
        if (headers && headers.authorization) {
            const parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                resolve(parted[1]);
            } else {
                reject(new ErrorResponse(ERROR_CODE.MALFORMED_BEARER_TOKEN));
            }
        } else {
            reject(new ErrorResponse(ERROR_CODE.NO_AUTHORIZATION_HEADER));
        }
    });
}

