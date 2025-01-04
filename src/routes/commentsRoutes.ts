import express from "express";
import comments from "../controller/commentsController";
const router = express.Router();

router.post("/", comments.addNewComment);
router.get("/", comments.getAllComments);
router.put("/:id", comments.updateComment);
router.delete("/:id", comments.deleteComment);
router.get("/:postId", comments.getCommentsByPostId);

export default router;
