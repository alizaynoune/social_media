import Message from '../../models/message.js';

import { body, validationResult } from 'express-validator';
import { errorFormatter } from "../../config/express-validator-Formatter.js";
import ErrorResponse from '../../utils/errorResponse.js';
import { ERROR_CODE } from '../../utils/errorCode.js';
import { Handler as SuccessHandler } from '../../utils/successHandler.js';
import { SUCCESS_CODE } from '../../utils/successCode.js';
import { roles } from '../../config/roles.js';


import Conversation from "../../models/conversation.js";
import blocked from "../../models/blocked.js";
import User from "../../models/User.js";
import message from '../../models/message.js';


export const getMessages = async (req, res, next) => {
    // validation body fields
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));
    const sort = req.query.sortBy?.match(/\-?createdAt/g)?.[0] || '-createdAt';
    // number of page for pagination
    const page = Math.abs(parseInt(req.query.page)) || 1;
    // size of page for pagination
    const limit = Math.abs(parseInt(req.query.limit)) || 10;
    // number skip for pagination
    const skip = (page - 1) * limit;

    let select = req.query.select?.match(/sender|receiver/g)?.[0];
    console.log(select, 'select');
    if (select === 'sender') select = { sender: res.locals.user.id };
    else if (select === 'receiver') select = { sender: { $ne: res.locals.user.id } };
    else select = { members: res.locals.user.id };

    console.log(sort, page, limit, skip);


    try {
        let UserInConv = await Conversation.findOne({ _id: req.params.id, members: { $in: [res.locals.user.id] } });
        if (!UserInConv)
            return next(new ErrorResponse(ERROR_CODE.CONVERSATION_NOT_FOUND));
        let messages = await Message.find(select).and({ conversation: req.params.id }).sort(sort).skip(skip).limit(limit);
        let messagesToJson = messages.map(message => message.toJSON());
        let messagesCount = await Message.countDocuments(select);
        return SuccessHandler(res, messagesToJson, SUCCESS_CODE.SUCCESS, { messagesCount, size: messages.length });
    } catch (error) {
        return next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    // validation body fields
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));
    try {
        let UserInConv = await Conversation.find({ _id: req.params.id, members: { $in: [res.locals.user.id] } });
        if (!UserInConv)
            return next(new ErrorResponse(ERROR_CODE.CONVERSATION_NOT_FOUND));
        let message = await Message.create({ text: req.body.text, sender: res.locals.user.id, conversation: req.params.id });
        if (!message)
            return next(new ErrorResponse(ERROR_CODE.MESSAGE_NOT_CREATED));
        return SuccessHandler(res, message.toJSON(), SUCCESS_CODE.SUCCESS);


        // res.json({ message });
    } catch (error) {
        return next(error);
    }
};

export const deleteMessage = async (req, res, next) => {
    // return res.send('deleteMessage');
    // validation body fields
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));
    try {
        let message = await Message.findOne({ _id: req.params.id, sender: res.locals.user.id });
        if (!message)
            return next(new ErrorResponse(ERROR_CODE.MESSAGE_NOT_FOUND));
        if (!message.sender.equals(res.locals.user.id))
            return next(new ErrorResponse(ERROR_CODE.PERMISSION_DENIED));
        if (message.status === 'read')
            return next(new ErrorResponse(ERROR_CODE.MESSAGE_CAN_NOT_BE_DELETED));
        let deleted = await message.remove();
        console.log(deleted, 'deleted');
        if (!deleted)
            return next(new ErrorResponse(ERROR_CODE.MESSAGE_NOT_DELETED));
        // message.remove();
        return SuccessHandler(res, {}, SUCCESS_CODE.SUCCESS);
    } catch (error) {
        return next(error);
    }
};

