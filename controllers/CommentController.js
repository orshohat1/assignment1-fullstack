const Comment = require("../models/Comment");
const mongoose = require("mongoose");

const createComment = async (req, res) => {
    const { postId } = req.params;
    const { author, content } = req.body;
    if (!content || content.trim() === '') {
        return res.status(400).send("comment is empty");
    }
    try {
        const comment = new Comment({ author, content, postId });
        await comment.save();
        res.status(201).send(comment);
    } catch (err) {
        res.status(400).send(err.message);
    }
  };

  const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findById(id);
      res.status(200).send({comment});
    } catch (err) {
      res.status(400).send(err.message);
    }
};

const getAllPostComments = async (req, res) => {
    const { postId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid Post ID" });
    }
  
    try {
      const comments = await Comment.find({ postId: postId });
  
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const editComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content || content.trim() === '') {
        return res.status(400).send("comment is empty");
    }
    const comment = await Comment.findById(id);
    try {
        newData = {author: comment.author, content: content, postId: comment.postId}
        const updatedComment = await Comment.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).send({message: "comment updated!", updatedComment});
      } catch (err) {
        res.status(400).send(err.message);
      }
};

const deleteComment = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    try {
      const comment = await Comment.findByIdAndDelete(id);
      res.status(200).send({message: "comment deleted successfully", comment});
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

module.exports = {
    createComment,
    getCommentById,
    getAllPostComments,
    editComment,
    deleteComment
};