const postModel = require("../models/postModel");

const addNewPost = async (req, res) => {
  try {
    const newPost = await postModel.create(req.body);
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postModel.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const currentPost = await postModel.findById(postId);
    res.status(200).send(currentPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostsBySenderId = async (req, res) => {
  const senderId = req.params.senderId;

  try {
    const posts = await postModel.find({ senderId });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const newPostData = req.body;

  try {
    const newPost = await postModel.findOneAndUpdate(
      { _id: postId },
      newPostData,
      { new: true }
    );

    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addNewPost,
  getAllPosts,
  getPostById,
  getPostsBySenderId,
  updatePost,
};
