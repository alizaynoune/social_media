import express from 'express';
import { login, register }from '../controllers/users/authController.js';
import { method as validatorMethod } from '../middlewares/validator.js';
import { registered as accesseRegister } from '../middlewares/accessMiddleware.js';

const router = express.Router();


// endpoint /api/v1/auth/login



// @router - login
router.post('/login', validatorMethod('login'), login);

// @router - register
router.post('/register', validatorMethod('create'), accesseRegister, register);









export default router;
