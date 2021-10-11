import {body, query, param} from 'express-validator';
import { ERROR_CODE } from '../utils/errorCode.js';


export const validateMessage = {
    create : [
        body('text').exists().withMessage(ERROR_CODE.MESSAGE_IS_REQUIRED).trim().isLength({min : 3, max : 255}).withMessage(ERROR_CODE.MESSAGE_INVALID_LENGTH)
        .isString().withMessage(ERROR_CODE.MESSAGE_IS_INVALID).escape(),
    ],
};