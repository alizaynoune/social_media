import ErrorResponse from '../../utils/errorResponse.js';
import { validationResult } from 'express-validator';
import { errorFormatter } from '../../config/express-validator-Formatter.js';
import { SUCCESS_CODE } from '../../utils/successCode.js';
import { ERROR_CODE } from '../../utils/errorCode.js';
import User from '../../models/User.js';
import { Handler as SuccessHandler } from '../../utils/successHandler.js';
import { roles } from '../../config/roles.js';

import blocked from '../../models/blocked.js';


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns current user profile
 */
export const getProfile = (req, res, next) => {
    return SuccessHandler(res, res.locals.user, SUCCESS_CODE.SUCCESS);
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns current user profile after update
 */
export const updateProfile = async (req, res, next) => {
    // validation body fields
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));

    // filter body fields
    req.body = res.locals.userPermission.filter(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) return next(new ErrorResponse(ERROR_CODE.NO_UPDATE));
    try {
        const user = await User.findByIdAndUpdate(res.locals.user.id, req.body, { new: true });
        if (!user)
            return next(new ErrorResponse(ERROR_CODE.DATABASE_CONNECTION_ERROR));
        const userJson = user.toJSON();
        return SuccessHandler(res, userJson, SUCCESS_CODE.SUCCESS);
    } catch (error) {
        return next(error);
    }
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns user profile by id
 */
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return next(new ErrorResponse(ERROR_CODE.USER_NOT_FOUND));
        const blockedUser = await blocked.findOne(
            {
                $and: [
                    { $or: [{ userId: user._id }, { blockedUserId: user._id }] },
                    { $or: [{ userId: res.locals.user.id }, { blockedUserId: res.locals.user.id }] }
                ]
            });
        if (blockedUser)
            return next(new ErrorResponse(ERROR_CODE.YOU_DONT_HAVE_ENOUGH_PERMISSION));
        // console.log(blockedUser, 'user>>');
        const userJson = user.toJSON();
        return SuccessHandler(res, userJson, SUCCESS_CODE.SUCCESS);
    } catch (error) {
        return next(error);
    }
}


/**
 * 
 * @param {*} req => query [page, limit, sort, search, selector, where]
 * @param {*} res 
 * @param {*} next 
 * @returns list of users
 */
export const getUsers = async (req, res, next) => {

    // validation query fields
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        // console.log(req.query.sortBy?.match(/(-?createdAt)|(-?firstName)|(-?email)|(-?role)|(-?birthday)$/g), ' >match');
        console.log(req.query.search?.replace(/\./g, '\\.').replace(/\*/g, '.*'), ' >replace');
        return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));
    }

    const regexSearch = new RegExp(req.query.search?.replace(/\./g, '\\.').replace(/\*/g, '.*'), 'ig');
    // console.log(regexSearch, 'regexSearch');
    const sort = req.query.sortBy?.match(/(\-?createdAt)|(\-?firstName)|(\-?email)|(\-?role)|(\-?birthday)|(\-?lastName)/g)?.[0] || '-createdAt';
    // console.log(req.query.sortBy?.match(/\-?createdAt|\-?firstName|\-?email|\-?role|\-?birthday|\-?lastName/g), 'sort');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const roleCanRead = roles.can(res.locals.user.role).readAny('role').attributes || ['user'];
    const regexRole = new RegExp(roleCanRead.join('|') || 'user', 'ig');

    const matchSelector = req.query.selector?.match(/((firstName)|(lastName)|(email))/g) || ['firstName', 'lastName', 'email'];
    const selector = matchSelector.map(item => ({ [item.trim()]: regexSearch }));
    console.log(selector, 'selector');

    const wherePermission = roles.can(res.locals.user.role).readAny('queryWhere').attributes || [];
    const where = req.query.where?.match(/(\w*\[[^\]]*\])/g).filter(item => wherePermission.includes(item.match(/^([^\[]+)/g)[0]) ? item : null);
    console.log(where, 'where');
    console.log(wherePermission, 'wherePermission');

    const role = where?.find(item => /role\[/.test(item))?.match(regexRole)?.filter(item => roleCanRead.includes(item)) || roleCanRead;
    console.log(role, 'role');
    const gander = where?.find(item => /gander\[/.test(item))?.match(/m|f/ig) || ['m', 'f'];
    // console.log(gander, 'gander');
    const currentTime = new Date();
    const age = where?.find(item => /age\[/.test(item))?.match(/\d+/g) || [18, 100];
    
    const ageRange = age[1] ? { $gte: currentTime.getFullYear() - parseInt(age[1]), $lte: currentTime.getFullYear() - parseInt(age[0]) } : { $eq: currentTime.getFullYear() - parseInt(age[0]) };
    console.log(ageRange, 'ageRange');
    
    const is_deleted = where?.find(item => /is_deleted\[/.test(item))?.match(/true|false/ig)?.[0] === 'true';
    console.log(is_deleted, 'is_deleted');
    
    const is_active = where?.find(item => /is_active\[/.test(item))?.match(/true|false/ig)?.[0] === 'false' ? false : true;
    console.log(is_active, 'is_active');
    
    const createdAt = where?.find(item => /createdAt\[/.test(item))?.match(/\d{4}-?\/?\d{0,2}-?\/?\d{0,2}/g) || [currentTime.toISOString()];
    console.log(createdAt, 'createdAt');

    // console.log(req.query, 'req.query');



    try {
        // get list of users blocked by current user or they blocked current user
        const listBlockedUser = await blocked.find({ $or: [{ userId: res.locals.user.id }, { blockedUserId: res.locals.user.id }] });
        // map object id of blocked users to array
        const listBlockedUserId = listBlockedUser.map(item =>
            (item.userId === res.locals.user.id) ? item.blockedUserId.toString() : item.userId.toString());
        // don't forget to filter users don't activeted and is deleted
        // get list of users
        const users = await User.find({ _id: { $nin: listBlockedUserId, $nin: res.locals.user.id }, role: { $in: role } })
            .or(selector)
            .sort(sort).skip(skip).limit(limit);
        if (!users) return next(new ErrorResponse(ERROR_CODE.USER_NOT_FOUND));
        // list of users to json
        const usersJson = users.map(user => user.toJSON());
        // get total count of users
        const total = await User.count({ _id: { $nin: listBlockedUserId, $nin: res.locals.user.id } })
            .or(selector);
        // return list of users
        return SuccessHandler(res, usersJson, SUCCESS_CODE.SUCCESS, { total, size: users.length });
    } catch (error) {
        return next(error);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns new user profile
 */
export const createUser = async (req, res, next) => {
    // validation body fields
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));



    req.body = res.locals.userPermission.filter(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) return next(new ErrorResponse(ERROR_CODE.NO_UPDATE));

    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.locals.user = user.toJSON();
        res.locals.userPermission = roles.can(res.locals.user.role)['readAny']('profile');
        return SuccessHandler(res, res.locals.user, SUCCESS_CODE.CREATED);
    } catch (err) {
        return next(err);
    }

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns user profile after update
 */
export const updateUser = async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(new ErrorResponse(ERROR_CODE.USER_NOT_FOUND));
        let permission = roles.can(res.locals.user.role)['updateAny'](user.role);
        if (permission.granted && req.body.role) permission = roles.can(res.locals.user.role)['createAny'](req.body.role);
        if (!permission.granted) return next(new ErrorResponse(ERROR_CODE.PERMISSION_DENIED));
        req.body = permission.filter(req.body);
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) return next(new ErrorResponse(ERROR_CODE.NO_UPDATE));
        const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!userUpdate) return next(new ErrorResponse(ERROR_CODE.DATABASE_CONNECTION_ERROR))
        res.locals.userPermission = roles.can(res.locals.user.role)['readAny']('profile');
        const userJson = userUpdate.toJSON();
        return SuccessHandler(res, userJson, SUCCESS_CODE.SUCCESS);
    } catch (err) {
        return next(err);
    }
}

