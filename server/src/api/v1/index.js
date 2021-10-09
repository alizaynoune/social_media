import express from 'express';
import AuthRoute from './routes/authRoute.js';
import usersRoute from './routes/usersRoute.js';
import { passport } from '../v1/middlewares/passport.js';
import conversationRouter from '../v1/routes/conversationRoute.js';
import messageRouter from '../v1/routes/messageRoute.js';
import friendsRouter from '../v1/routes/friendsRoute.js';
import blockedRouter from '../v1/routes/blockedRoute.js';
import postRouter from '../v1/routes/postRoute.js';

const router = express.Router();

// root endpoint for api version 1 /api/v1

// @router - /api/v1/
router.get('/', (req, res, next) => {
    res.status(200).json({
        '/api/v1' : 'all api/v1/ endpoint',
        '/api/v1/auth': {
            post : {'/login' : 'login'},
            '/register' : 'regester',
        },
        '/api/v1/user' : {
            '/' : 'profile current user',
            '/update' : 'update profile current user',
            '/delete' : 'delete current user',
        } 
    });
})

// @router - /api/v1/auth
router.use('/auth', AuthRoute);

// @router - Protected
router.use(passport);

// @router - /api/v1/user
router.use('/users', usersRoute);

// @router - /api/v1/conversation
router.use('/conversations', conversationRouter);

// @router - /api/v1/message
router.use('/messages', messageRouter);

// @router - /api/v1/friends
router.use('/friends', friendsRouter);

// @router - /api/v1/block
router.use('/blocked', blockedRouter);

// @router - /api/v1/post
router.use('/posts', postRouter);




export default router;