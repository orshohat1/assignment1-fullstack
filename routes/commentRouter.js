const express = require("express");
const router = express.Router();

const commentController = require("../controllers/CommentController");

router.get("/", commentController.getAllPostComments); // 

router.get("/:id", commentController.getCommentById); // v

router.post("/", commentController.createComment); // v

router.put("/:id", commentController.editComment); //

router.delete("/:id", commentController.deleteComment); // v

module.exports = router;
