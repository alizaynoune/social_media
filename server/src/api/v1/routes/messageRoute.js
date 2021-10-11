import express from 'express';
import * as messages from '../controllers/messages/messages.js';
import * as access from '../middlewares/accessMiddleware.js';
import { method as validatorMethod } from '../middlewares/validator.js';




const router = express.Router();

// endpoint - /api/v1/messages
router.route('/')
    .get(access.grandAccess('readOwn', 'messages'), messages.getAllMessages)
    .post(validatorMethod('create_send_message'), validatorMethod('create_conversation'), access.grandAccess('createOwn', 'messages'), messages.createSendMessage)
    .put((req, res, next) => { res.send('update a message') })
    .delete((req, res, next) => { res.send('delete a message') });


router.route('/:id(\[0-9a-f\]{24})')
    .get(access.grandAccess('readOwn', 'messages'), messages.getMessages)
    .post(validatorMethod('create_message'), access.grandAccess('createOwn', 'messages'), messages.sendMessage)
    .delete(access.grandAccess('deleteOwn', 'messages'), messages.deleteMessage);



export default router;