import express from 'express';
import { getUser, getProfile, updateProfile, getUsers, updateUser, createUser } from '../controllers/users/userController.js';
import { method as validatorMethod } from '../middlewares/validator.js';
import { grandAccess, grandCreateUser } from '../middlewares/accessMiddleware.js';

const router = express.Router();

// endpoint: /api/v1/users



// all users
router.route('/')
    // find all users
    .get(validatorMethod('query'), grandAccess('readAny', 'profile'), getUsers)
    // create new user
    .post(validatorMethod('create'), grandAccess('createAny', 'profile'), grandCreateUser, createUser);


// self profile
router.route('/profile')
    // get profile
    .get(grandAccess('readOwn', 'profile'), getProfile)
    // update profile
    .put(validatorMethod('update'), grandAccess('updateOwn', 'profile'), updateProfile)
    // delete profile
    .delete((req, res, next) => { return res.send('test delete profile') });



// user by id
router.route('/:id(\[0-9a-f\]{24})')
    // get user by id
    .get(grandAccess('readAny', 'profile'), getUser)
    // update user by id
    .put(validatorMethod('update'), grandAccess('updateAny', 'profile'), updateUser)
    // delete user by id
    .delete(grandAccess('deleteAny', 'profile'), (req, res, next) => { return res.send('test delete user') });






export default router;