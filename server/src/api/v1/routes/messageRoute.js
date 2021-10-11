import express from 'express';
import * as messages from '../controllers/messages/messages.js';
import * as access from '../middlewares/accessMiddleware.js';
import {  method as validatorMethod } from '../middlewares/validator.js';




const router = express.Router();

// endpoint - /api/v1/messages
router.route('/:id(\[0-9a-f\]{24})')
    .get(access.grandAccess('readOwn', 'messages'), messages.getMessages)
    .post(validatorMethod('create_message') ,access.grandAccess('createOwn', 'messages'), messages.sendMessage)
    .delete(access.grandAccess('deleteOwn', 'messages'), messages.deleteMessage);


export default router;