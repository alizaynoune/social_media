import express from 'express';
import {  method as validatorMethod } from '../middlewares/validator.js';
import * as conversationController from '../controllers/conversations/conversation.js';
import * as access from '../middlewares/accessMiddleware.js';


const router = express.Router();


// endpoint: /api/v1/conversation

router.route('/')
    .get(access.grandAccess('readOwn', 'conversation') ,conversationController.getConversation)
    .post(validatorMethod('create_conversation'), access.grandAccess('createOwn', 'conversation') ,conversationController.createConversation)
    .delete(access.grandAccess('deleteOwn', 'conversation') ,conversationController.deleteConversation);

router.route('/:conversationId')
    .get((req, res) => {
        res.send('get conversation');
    })
    .put((req, res) => {
        res.send('update conversation');
    })
    .delete((req, res) => {
        res.send('delete conversation');
    });



export default router;
