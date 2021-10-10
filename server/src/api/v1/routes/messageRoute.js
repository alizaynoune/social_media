import express from 'express';
import * as messages from '../controllers/messages/messages.js'


const router = express.Router();

// endpoint - /api/v1/messages
router.route('/:id(\[0-9a-f\]{24})')
    .get(messages.getMessages)
    .post(messages.sendMessage)
    .delete(messages.deleteMessage);


export default router;