import express from 'express';

const router = express.Router();

// endpoint - /api/v1/friends

router.route('/')
    .get((req, res) => {
        res.send('get all friends');
    })
    .post((req, res) => {
        res.send('add a friend');
    })
    .delete((req, res) => {
        res.send('delete a friend');
    });

router.route('/:id')
    .get((req, res) => {
        res.send('get a friend');
    })
    .put((req, res) => {
        res.send('update a friend');
    })
    .delete((req, res) => {
        res.send('delete a friend');
    });



export default router;
