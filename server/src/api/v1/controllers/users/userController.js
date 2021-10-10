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

    // init regex for search and replace '*' to '.*' and '.' to '\\.'
    const regexSearch = new RegExp(req.query.search?.replace(/\./g, '\\.').replace(/\*/g, '.*'), 'ig');
    // match sortBy with regex
    const sort = req.query.sortBy?.match(/(\-?createdAt)|(\-?firstName)|(\-?email)|(\-?role)|(\-?birthday)|(\-?lastName)/g)?.[0] || '-createdAt';
    // number of page for pagination
    const page = parseInt(req.query.page) || 1;
    // size of page for pagination
    const limit = parseInt(req.query.limit) || 10;
    // number skip for pagination
    const skip = (page - 1) * limit;

    // filter query fields
    const selector = (req.query.selector?.match(/((firstName)|(lastName)|(email))/g) || ['firstName', 'lastName', 'email'])
        .map(selector => ({ [selector]: regexSearch }));
    // console.log(selector, 'selector');

    // const testWhere = req.query.where?.match(/(\w*\[[^\]]*\])/g) || [];
    // init where for query
    let where = new Object();
    // split where by query[value]
    req.query.where?.match(/(\w*\[[^\]]*\])/g)?.forEach(item => {
        where[item.match(/^([^\[]+)/g)[0].trim()] = item.match(/(?<=\[)(.*?)(?=\])/g)[0].trim();
    }) || {};
    // filter where by role permission attribute
    where = roles.can(res.locals.user.role).readAny('queryWhere')?.filter(where);
    // init role will be selecting
    let WhereRole = new Object();
    // split where role and return role as object {role: $in [roles after filtering]}
    where.role?.split(/\s*,{1}\s*/)?.forEach(item => item.match(/w*/) ? WhereRole[item] = item : null) || {};
    where.role = {
        $in: Object.values(
            roles.can(res.locals.user.role).readAny('role')?.filter(
                Object.keys(WhereRole).length === 0 ? { user: 'user', admin: 'admin', superAdmin: 'superAdmin' } : WhereRole
            ))
    };
    where.is_deleted = where.deleted?.match(/true|false/g)?.[0] === 'true';
    delete where.deleted;
    where.email_active = where.activated?.match(/true|false/g)?.[0] === 'false' ? false : true;
    // where.email_active = false;
    if (where.age) {
        let currentTime = new Date();
        let age = where.age.split(',').map(item => parseInt(item));
        where.birthday = age[1] && age[0] !== age[1] ? {
            $lte: new Date(currentTime.getFullYear() - ((age[0] < age[1]) ? age[0] : age[1]), currentTime.getMonth(), currentTime.getDate()),
            $gte: new Date(currentTime.getFullYear() - ((age[0] < age[1]) ? age[1] : age[0]), currentTime.getMonth(), currentTime.getDate()),
        } : {
            $lte: new Date(currentTime.getFullYear() - age[0], currentTime.getMonth(), currentTime.getDate()),
            $gte: new Date(currentTime.getFullYear() - (age[0] + 1), currentTime.getMonth(), currentTime.getDate()),
        };
        delete where.age;
    }
    if (where.createdAt) {
        where.createdAt = where.createdAt.split(/\s*,{1}\s*/).map(item => Date.parse(item));
        where.createdAt = where.createdAt[1] && where.createdAt[0] !== where.createdAt[1] ? {
            $lte: new Date((where.createdAt[0] < where.createdAt[1] ? where.createdAt[1] : where.createdAt[0])),
            $gte: new Date((where.createdAt[0] < where.createdAt[1] ? where.createdAt[0] : where.createdAt[1])),
        } : {
            $eq: new Date(where.createdAt[0])
        };
    }
    where.gander ? where.gander = where.gander.match(/m|f/gi)?.[0].toLowerCase() : 0;
    where.granted ? 0 : delete where.gander;
    console.log(where, 'testWhere');

    try {
        // get list of users blocked by current user or they blocked current user
        const listBlockedUser = await blocked.find({ $or: [{ userId: res.locals.user.id }, { blockedUserId: res.locals.user.id }] });
        // map object id of blocked users to array
        const listBlockedUserId = listBlockedUser.map(item =>
            (item.userId === res.locals.user.id) ? item.blockedUserId.toString() : item.userId.toString());
        // don't forget to filter users don't activeted and is deleted
        // get list of users
        const users = await User.find({ _id: { $nin: listBlockedUserId, $nin: res.locals.user.id } })
            .or(selector).and(where).sort(sort).skip(skip).limit(limit);
        if (!users) return next(new ErrorResponse(ERROR_CODE.USER_NOT_FOUND));
        // list of users to json
        const usersJson = users.map(user => user.toJSON());
        // get total count of users
        const total = await User.count({ _id: { $nin: listBlockedUserId, $nin: res.locals.user.id } })
            .or(selector).and(where);
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

