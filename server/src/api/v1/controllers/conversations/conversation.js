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


export const getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({ members: { $in: [res.locals.user.id] } });
        if (!conversation) {
            return next(new ErrorResponse(ERROR_CODE.CONVERSATION_NOT_FOUND));
        }
        const ret = conversation.map(elem => elem.toJSON());
        return SuccessHandler(res, ret, SUCCESS_CODE.CONVERSATION_FOUND);
    } catch (error) {
        return next(error);
    }
};


export const createConversation = async (req, res, next) => {
    // validate request
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));
    // push current user to members
    req.body.members.push(res.locals.user.id.toString());
    // uniqe check
    const members = [...new Set(req.body.members)];
    // create userIds object for find if user is blocked
    const userId = members.map((member) => {
        return ({ userId: member })
    });
    // create blockedUserId object for find if user is blocked
    const blockedUserId = members.map((member) => {
        return ({ blockedUserId: member })
    });
    try {
        const user = await User.find({ _id: { $in: members } }).exec();
        console.log(user.length, user);
        if (user.length !== members.length) {
            return next(new ErrorResponse(ERROR_CODE.YOU_CAN_NOT_CREATE_CONVERSATION_WITH_NOT_EXISTING_USERS));
        }
        // check if users is blocked each other
        const blockedMembers = await blocked.find({ $and: [{ $or: blockedUserId }, { $or: userId }] });
        if (blockedMembers.length > 0) {
            return next(new ErrorResponse(ERROR_CODE.YOU_CAN_NOT_CREATE_CONVERSATION_WITH_BLOCKED_USERS));
        }
        // check if conversation already exists
        // const conversation = await Conversation.find({ members: { $in: members } });
        // if (conversation.length > 0) {
        //     return next(new ErrorResponse(ERROR_CODE.CONVERSATION_ALREADY_EXISTS));
        // }
        const conversation = await Conversation.create({ userId: res.locals.user.id, members: members });
        const ret = conversation.toJSON();
        res.locals.userPermission = roles.can(res.locals.user.role)['readOwn']('conversation');
        return SuccessHandler(res, ret, SUCCESS_CODE.CONVERSATION_CREATED);
    } catch (error) {
        return next(error);
    }

};


export const deleteConversation = async (req, res, next) => {
    res.send('delete conversation');
};


export const updateConversation = async (req, res, next) => {
    res.send('update conversation');
}

export const getConversationById = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const conversation = await Conversation.findOne({_id: req.params.id, members: { $in: [res.locals.user.id] } });
        if (!conversation)
            return next(new ErrorResponse(ERROR_CODE.CONVERSATION_NOT_FOUND));
        const ret = conversation.toJSON();
        return SuccessHandler(res, ret, SUCCESS_CODE.CONVERSATION_FOUND);
    } catch (error) {
        return next(error);
    }
};

