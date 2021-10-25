// import { query } from 'express';
import { body, query } from 'express-validator';
import { ERROR_CODE } from '../utils/errorCode.js';


// console.log(body('email'));

export const userValidator = {
    createUser: [
        body('email').notEmpty().withMessage(ERROR_CODE.EMAIL_REQUIRED).trim()
            .isEmail().withMessage(ERROR_CODE.EMAIL_INVALID),
        body('password').notEmpty().withMessage(ERROR_CODE.PASSWORD_REQUIRED)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage(ERROR_CODE.PASSWORD_INVALID),
        body('confirmPassword').notEmpty().withMessage(ERROR_CODE.CONFIRM_PASSWORD_REQUIRED)
            .custom((value, { req }) => { return (value === req.body.password) }).withMessage(ERROR_CODE.CONFIRM_PASSWORD_NOT_MATCH),
        body('firstName').notEmpty().withMessage(ERROR_CODE.FIRST_NAME_REQUIRED)
            .trim().escape().matches(/^[a-zA-Z]{3,}$/).withMessage(ERROR_CODE.FIRST_NAME_INVALID),
        body('lastName').notEmpty().withMessage(ERROR_CODE.LAST_NAME_REQUIRED)
            .trim().escape().matches(/^[a-zA-Z]{3,}$/).withMessage(ERROR_CODE.LAST_NAME_INVALID),
        body('phoneNumber').optional().trim().matches(/^[+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{9,10}$/).withMessage(ERROR_CODE.PHONE_NUMBER_INVALID),
        body('gander').optional().notEmpty().withMessage(ERROR_CODE.GANDER_REQUIRED).trim().matches(/^[m|f]{1}$/).withMessage(ERROR_CODE.GANDER_INVALID),
        body('birthday').optional().notEmpty().withMessage(ERROR_CODE.BIRTHDAY_REQUIRED).trim()
            .isDate().withMessage(ERROR_CODE.BIRTHDAY_INVALID),
        body('role').optional().notEmpty().withMessage(ERROR_CODE.ROLE_REQUIRED).trim()
            .isIn(['user', 'admin', 'superadmin']).withMessage(ERROR_CODE.ROLE_INVALID),

    ],
    updateUser: [
        body('email').optional().trim().isEmail().withMessage(ERROR_CODE.EMAIL_INVALID),
        body('password').optional().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage(ERROR_CODE.PASSWORD_INVALID)
            .custom((value, { req }) => { return (value === req.body.confirmPassword) }).withMessage(ERROR_CODE.CONFIRM_PASSWORD_NOT_MATCH),
        body('firstName').optional().trim().escape().matches(/^[a-zA-Z]{3,}$/).withMessage(ERROR_CODE.FIRST_NAME_INVALID),
        body('lastName').optional().trim().escape().matches(/^[a-zA-Z]{3,}$/).withMessage(ERROR_CODE.LAST_NAME_INVALID),
        body('phoneNumber').optional().trim().matches(/^[+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{9,10}$/).withMessage(ERROR_CODE.PHONE_NUMBER_INVALID),
        body('gander').optional().trim().isIn(['m', 'f']).withMessage(ERROR_CODE.GANDER_INVALID),
        body('birthday').optional().trim().isDate().withMessage(ERROR_CODE.BIRTHDAY_INVALID),
        body('role').optional().trim().isIn(['user', 'admin', 'superadmin']).withMessage(ERROR_CODE.ROLE_INVALID),
    ],
    login: [
        body('email').notEmpty().withMessage(ERROR_CODE.EMAIL_REQUIRED).trim()
            .isEmail().withMessage(ERROR_CODE.EMAIL_INVALID),
        body('password').notEmpty().withMessage(ERROR_CODE.PASSWORD_REQUIRED)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage(ERROR_CODE.PASSWORD_INVALID),
    ],

    query: [
        query('search').optional().trim().escape().custom(val => { return val.match(/[\w\.@\-\*]{3,}$/g); }).withMessage(ERROR_CODE.SEARCH_INVALID),
        query('page').optional().trim().isInt().withMessage(ERROR_CODE.PAGE_INVALID),
        query('limit').optional().trim().isInt().withMessage(ERROR_CODE.LIMIT_INVALID),
        query('sortBy').optional().trim().custom((val) => {
            return val.match(/(\-?createdAt)?(\-?firstName)?(\-?email)?(\-?role)?(\-?birthday)?(\-?lastName)?/g)[0]
        }).withMessage(ERROR_CODE.SORT_BY_INVALID),
        query('selector').optional().trim().custom((val) => { return val.match(/((firstName)|(lastName)|(email))/g) }).withMessage(ERROR_CODE.SELECTOR_INVALID),
    ],

};


// module.exports = userValidator;






