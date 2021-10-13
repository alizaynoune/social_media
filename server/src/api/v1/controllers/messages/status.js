import Message from '../../models/message.js';

import { validationResult } from 'express-validator';
import { errorFormatter } from "../../config/express-validator-Formatter.js";
import ErrorResponse from '../../utils/errorResponse.js';
import { ERROR_CODE } from '../../utils/errorCode.js';
import { Handler as SuccessHandler } from '../../utils/successHandler.js';
import { SUCCESS_CODE } from '../../utils/successCode.js';
import { roles } from '../../config/roles.js';


import Conversation from "../../models/conversation.js";
import blocked from "../../models/blocked.js";
import User from "../../models/User.js";


export const readMessage = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errorFormatter(errors.array())));
    }
    const { messageId } = req.params;
    const userId = res.locals.user.id;
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return next(new ErrorResponse(ERROR_CODE.MESSAGE_NOT_FOUND));
        }
        const conversation = await Conversation.findOne({$and : [{_id : message.conversation}, {members : {$in : [userId]}}]});
        if (!conversation) {
            return next(new ErrorResponse(ERROR_CODE.CONVERSATION_NOT_FOUND));
        }
        const readMessage = await Message.findByIdAndUpdate(messageId, {$addToSet : {readBy : userId}}, {new : true});


        res.json({
            status: SUCCESS_CODE.SUCCESS,
            data: {
                message: readMessage
            }
        });

        
    } catch (error) {
        return next(error);
    }
}

export const deliveredMessage = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errorFormatter(errors.array())));
    }
    const { messageId } = req.params;
    const userId = res.locals.user.id;
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return next(new ErrorResponse(ERROR_CODE.MESSAGE_NOT_FOUND));
        }
        const conversation = await Conversation.findOne({$and : [{_id : message.conversation}, {members : {$in : [userId]}}]});
        if (!conversation) {
            return next(new ErrorResponse(ERROR_CODE.CONVERSATION_NOT_FOUND));
        }
        
        const update = await Message.findByIdAndUpdate(messageId, {
            $addToSet: {
                deliveredBy : userId
            }
        }, { new: true });
        res.json({
            status: SUCCESS_CODE.SUCCESS,
            data: {
                message: update
            }
        });
    } catch (error) {
        return next(error);
    }
}