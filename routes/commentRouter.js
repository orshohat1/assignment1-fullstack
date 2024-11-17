const express = require("express");
const router = express.Router();

const commentController = require("../controllers/CommentController");

router.get("/", commentController.getAllPostComments);

router.get("/:id", commentController.getCommentById);

router.post("/", commentController.createComment);

router.put("/:id", commentController.editComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
