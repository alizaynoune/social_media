import express from 'express';


const router = express.Router();

// endpoint - /api/v1/messages
router.route('/')
    .get((req, res) => {
        res.send('get messageRoute');
    })
    .post((req, res) => {
        res.send('post messageRoute');
    })
    .delete((req, res) => {
        res.send('delete messageRoute');
    });


export default router;