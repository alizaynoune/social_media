import { getTokenFromHeaders, verify } from '../utils/jwt.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import { ERROR_CODE } from '../utils/errorCode.js';



export const passport = async (req, res, next) => {
    try {
        const token = await getTokenFromHeaders(req.headers);
        const payload = await verify(token);
        const user = await User.findById(payload.id);
        if (!user) return next(new ErrorResponse(ERROR_CODE.ACCESS_DENIED));
        res.locals.user = user.toJSON();
        next();
    }
    catch (err) {
        next(err);
    }
}

// export default passport;