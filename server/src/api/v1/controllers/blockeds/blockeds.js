import { validationResult } from 'express-validator';
import { errorFormatter } from "../../config/express-validator-Formatter.js";
import ErrorResponse from '../../utils/errorResponse.js';
import { ERROR_CODE } from '../../utils/errorCode.js';
import { SUCCESS_CODE } from '../../utils/successCode.js';
import { Handler as SuccessHandler } from '../../utils/successHandler.js';
import { roles } from '../../config/roles.js'

import blockedsModel from '../../models/blocked.js';
import User from '../../models/User.js'

// current user get all blockeds
export const getBlockeds = async (req, res, next) => {
    try {
        const list = await blockedsModel.find({ userId: res.locals.user.id });
        const ret = list.map(elem => elem.toJSON())
        return SuccessHandler(res, ret, SUCCESS_CODE.SUCCESS);
    } catch (error) {
        return next(error);
    }
}

// user by id get all blockeds
export const getBlockedsByUserId = async (req, res, next) => {
    try {
        const list = await blockedsModel.find({ userId: req.params.id });
        const ret = list.map(elem => elem.toJSON())
        return SuccessHandler(res, ret, SUCCESS_CODE.SUCCESS);
    } catch (error) {
        return next(error);
    }
}


// new blocked
export const blockUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return next(new ErrorResponse(ERROR_CODE.USER_NOT_FOUND));
        const alreadyBlock = await blockedsModel.findOne({ $or: [{ userId: req.params.id }, { blockedUserId: req.params.id }] });
        if (alreadyBlock) {
            if (alreadyBlock.userId.equals(res.locals.user.id))
                return next(new ErrorResponse(ERROR_CODE.USER_ALREADY_BLOCKED))
            return next(new ErrorResponse(ERROR_CODE.YOU_ALREADY_BLOCKED_FROM_THIS_USER));
        }
        const newBlock = await blockedsModel.create({ userId: res.locals.user.id, blockedUserId: req.params.id });
        const ret = newBlock.toJSON();
        return SuccessHandler(res, ret, SUCCESS_CODE.SUCCESS_BLOCK_USER);
    } catch (error) {
        return next(error);
    }
}


// delete blocked
export const unblockUser = async (req, res, next) => {
    try {
        const blocked = await blockedsModel.findOne({ $and: [{ userId: res.locals.user.id }, { blockedUserId: req.params.id }] });
        if (!blocked)
            return next(new ErrorResponse(ERROR_CODE.USER_NOT_BLOCKED));
        const unblock = await blockedsModel.findByIdAndDelete(blocked._id);
        const user = await User.findById(unblock.blockedUserId);
        res.locals.userPermission = roles.can(res.locals.user.role)['readAny']('profile');
        return SuccessHandler(res, user.toJSON(), SUCCESS_CODE.SUCCESS_UNBLOCK_USER);
    } catch (error) {
        return next(error);
    }
}

