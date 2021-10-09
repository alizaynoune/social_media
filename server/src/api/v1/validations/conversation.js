import {body, query, param} from 'express-validator';
import { ERROR_CODE } from '../utils/errorCode.js';


export const validateConversation = {
    create: [
        body('members').notEmpty().withMessage(ERROR_CODE.CONVERSATION_MEMBER_REQUIRED).isArray().withMessage(ERROR_CODE.CONVERSATION_MEMBER_INVALID).custom(value => {
            return value.every(member => { return member.match(/^[0-9a-fA-F]{24}$/); });
        }).withMessage(ERROR_CODE.CONVERSATION_MEMBER_INVALID),
    ],
};


