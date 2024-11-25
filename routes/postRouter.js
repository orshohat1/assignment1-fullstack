const express = require ("express");
const {check} = require ("express-validator");
const PostController = require ("../controllers/PostController");

const router = express.Router();

router.post("/",
    check("title")
    .notEmpty()
    .isString(),
    check("content")
    .notEmpty()
    .isString(),
    check("author")
    .notEmpty()
    .isString(),
    PostController.addPost
);

router.get("/", PostController.getPosts);

router.get("/:id", PostController.getPostById);

router.put("/:id",
    check("title")
    .notEmpty()
    .isString(),
    check("content")
    .notEmpty()
    .isString(),
    check("author")
    .notEmpty()
    .isString(),
    PostController.updatePost
);

module.exports = router;
