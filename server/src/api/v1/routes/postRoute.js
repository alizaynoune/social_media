import  express from "express";

const router = express.Router();

// endpoint: /api/v1/posts

router.route("/")
    .get((req, res) => {
        res.send("Get all posts");
    });

router.route("/:id")
    .get((req, res) => {
        res.send("Get a post");
    })
    .post((req, res) => {
        res.send("Create a post");
    })
    .put((req, res) => {
        res.send("Update a post");
    })
    .delete((req, res) => {
        res.send("Delete a post");
    });




export default router;
