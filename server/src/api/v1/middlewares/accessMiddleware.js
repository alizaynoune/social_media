import { ERROR_CODE } from '../utils/errorCode.js';
import { roles } from '../config/roles.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';


export const grandAccess = (action, resource) => {
    return (req, res, next) => {
        const permission = roles.can(res.locals.user.role)[action](resource);
        if (!permission.granted) {
            return next(new ErrorResponse(ERROR_CODE.PERMISSION_DENIED));
        }
        res.locals.userPermission = permission;
        next();
    }
}

export const registered = (req, res, next) => {
    const permission = roles.can(req.body.role || 'user')['createOwn']('profile');
    res.locals.userPermission = permission;
    if (permission.granted) {
        req.body = permission.filter(req.body);
        return next();
    } else {
        return next(new ErrorResponse(ERROR_CODE.PERMISSION_DENIED));
    }

};


export const grandCreateUser = (req, res, next) => {
    const permission = roles.can(res.locals.user.role)['createAny'](req.body.role);
    if (permission.granted) {
        req.body = permission.filter(req.body);
        return next();
    } else {
        return next(new ErrorResponse(ERROR_CODE.PERMISSION_DENIED));
    }

}


