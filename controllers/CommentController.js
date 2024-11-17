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
      res.status(200).send({message: "comment found!", comment});
    } catch (err) {
      res.status(400).send(err.message);
    }
};

const getAllPostComments = (req, res) => {
    res.send("get all post comments");
    };

const editComment = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, {content: req.body.content || "bla"}, { new: true });
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