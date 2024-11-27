const express = require("express");
const post = require("../controller/postController");
const router = express.Router();

router.post("/", post.addNewPost);
router.get("/", post.getAllPosts);
router.get("/:id", post.getPostById);
router.get("/sender=/:senderId", post.getPostsBySenderId);
router.put("/:id", post.updatePost);

module.exports = router;
