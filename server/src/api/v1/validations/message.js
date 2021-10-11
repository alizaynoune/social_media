import {body, query, param} from 'express-validator';
import { ERROR_CODE } from '../utils/errorCode.js';


export const validateMessage = {
    create : [
        body('text').exists().withMessage(ERROR_CODE.MESSAGE_IS_REQUIRED).trim().isLength({min : 3, max : 255}).withMessage(ERROR_CODE.MESSAGE_INVALID_LENGTH)
        .isString().withMessage(ERROR_CODE.MESSAGE_IS_INVALID).escape(),
    ],
    createAndSend : [
        body('members').notEmpty().withMessage(ERROR_CODE.CONVERSATION_MEMBER_REQUIRED).isArray().withMessage(ERROR_CODE.CONVERSATION_MEMBER_INVALID).custom(value => {
            return value.every(member => { return member.match(/^[0-9a-fA-F]{24}$/); });
        }).withMessage(ERROR_CODE.CONVERSATION_MEMBER_INVALID),
        body('text').exists().withMessage(ERROR_CODE.MESSAGE_IS_REQUIRED).trim().isLength({min : 3, max : 255}).withMessage(ERROR_CODE.MESSAGE_INVALID_LENGTH)
        .isString().withMessage(ERROR_CODE.MESSAGE_IS_INVALID).escape(),
    ]
};