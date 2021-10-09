import ErrorResponse from '../../utils/errorResponse.js';
import { validationResult } from 'express-validator';
import { errorFormatter } from '../../config/express-validator-Formatter.js';
import { SUCCESS_CODE } from '../../utils/successCode.js';
import { ERROR_CODE } from '../../utils/errorCode.js';
import User from '../../models/User.js';
import { sign as jwtSign } from '../../utils/jwt.js';
import { Handler as SuccessHandler } from '../../utils/successHandler.js';
import { roles } from '../../config/roles.js';



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */

export const login = async (req, res, next) => {

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));
    
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        // return SuccessHandler(res, res.locals.user, SUCCESS_CODE.SUCCESS_LOGIN);
        if (!user) {
            return next(new ErrorResponse(ERROR_CODE.INVALID_CREDENTIALS));
        }
        const isMatch = await user.MatchPassword(req.body.password, user.password);
        if (!isMatch) {
            return next(new ErrorResponse(ERROR_CODE.INVALID_CREDENTIALS));
        }
        const token = await jwtSign({ id: user._id }, { expiresIn: '2d' });
        if (!token) {
            return next(new ErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR));
        }
        res.locals.user = user.toJSON();
        res.locals.user.tokenAuth = token;
        res.locals.userPermission = roles.can(res.locals.user.role)['readOwn']('profile');
        return SuccessHandler(res, res.locals.user, SUCCESS_CODE.SUCCESS_LOGIN);

    } catch (err) {
        return next(err);
    }



}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const register = async (req, res, next) => {
    // validation request errors
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) return next(new ErrorResponse(ERROR_CODE.VALIDATION_ERROR, errors.array()));

    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        const token = await jwtSign({ id: user._id }, { expiresIn: '2d' });
        if (!token) {
            return next(new ErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR));
        }
        res.locals.user = user.toJSON();
        res.locals.user.tokenAuth = token;
        res.locals.userPermission = roles.can(res.locals.user.role)['readOwn']('profile');
        return SuccessHandler(res, res.locals.user, SUCCESS_CODE.SUCCESS_REGISTER);
    } catch (err) {
        return next(err);
    }
}

