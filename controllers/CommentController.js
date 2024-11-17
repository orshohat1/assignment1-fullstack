const Comment = require("../models/Comment");
const { ObjectId } = require("mongoose");

const createComment = async (req, res) => {
    console.log(req.body);
    try {
      const comment = await Comment.create(req.body);
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
    const { postId } = req.body;
    try {
        const comments = await Comment.find({
            postId: postId
        });
        res.status(200).send({comments});
    } catch (err) {
        res.status(400).send(err.message);
    }
    };

const editComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
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