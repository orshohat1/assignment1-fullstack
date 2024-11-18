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
    check("owner")
    .notEmpty()
    .isString(),
    PostController.addPost
);

router.get("/", PostController.getAllPosts);

router.get("/:id", PostController.getPostById);

router.get("/", PostController.getPostBySenderId);

router.put("/:id",
    check("title")
    .notEmpty()
    .isString(),
    check("content")
    .notEmpty()
    .isString(),
    check("owner")
    .notEmpty()
    .isString(),
    PostController.updatePost
);

module.exports = router;