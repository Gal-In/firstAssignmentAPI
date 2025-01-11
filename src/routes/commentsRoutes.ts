import express from "express";
import comments from "../controller/commentsController";
import authenticationController from "../controller/authenticationController";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments API
 */

router.post("/", authenticationController.authenticate, comments.addNewComment);
router.get("/", comments.getAllComments);
router.put(
  "/:id",
  authenticationController.authenticate,
  comments.updateComment
);
router.delete(
  "/:id",
  authenticationController.authenticate,
  comments.deleteComment
);
router.get("/:postId", comments.getCommentsByPostId);

export default router;
