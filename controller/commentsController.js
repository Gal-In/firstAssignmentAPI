const commentsModel = require("../models/commentsModel");

const addNewComment = async (req, res) => {
  try {
    const newComment = await commentsModel.create(req.body);
    res.status(201).send(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllComments = async (req, res) => {
  try {
    const allComments = await commentsModel.find({});
    res.status(200).send(allComments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateComment = async (req, res) => {
  const CommentId = req.params.id;
  const newCommentData = req.body;

  try {
    const newComment = await commentsModel.findOneAndUpdate(
      { _id: CommentId },
      newCommentData,
      { new: true }
    );

    res.status(200).send(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedComment = await commentsModel.findByIdAndDelete(commentId);
    res.status(200).send(deletedComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId;

  try {
    const PostComments = await commentsModel.find({ postId });
    res.status(200).send(PostComments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addNewComment,
  getAllComments,
  updateComment,
  deleteComment,
  getCommentsByPostId,
};
