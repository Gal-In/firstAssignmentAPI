import express from "express";
import post from "../controller/postController";
import authenticationController from "../controller/authenticationController";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - senderId
 *       properties:
 *         _id:
 *           type: string
 *           description: Db generated post id
 *         title:
 *           type: string
 *           description: Posts title
 *         content:
 *           type: string
 *           description: Posts content
 *         senderId:
 *           type: string
 *           description: The id of the user who published the post
 *       example:
 *         _id: 6741b6ec0a270ec3d5875110
 *         title: This is the title of the post
 *         content: This is the content of the post
 *         senderId: 6780eba5f7a9d4a880c56d6b
 */

/**
 * @swagger
 * /posts:
 *   post:
 *      summary: Create new post
 *      description: Save new post and retrives it back
 *      tags:
 *          - Posts
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: Posts title
 *                          content:
 *                              type: string
 *                              description: Posts content
 *                          senderId:
 *                              type: string
 *                              description: The id of the user who published the post
 *                      required:
 *                        - title
 *                        - senderId
 *      responses:
 *          201:
 *              description: New post
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          400:
 *              description: Invalid input
 *          500:
 *              description: Server Error
 */
router.post("/", authenticationController.authenticate, post.addNewPost);

/**
 * @swagger
 * /posts:
 *   get:
 *      summary: Get all existing posts
 *      description: Retrives an array of all saved posts
 *      tags:
 *          - Posts
 *      responses:
 *          200:
 *              description: Array of all saved posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 *          500:
 *              description: Server Error
 */
router.get("/", post.getAllPosts);

// TODO: DOCUMENT HERE
router.get("/:id", post.getPostById);

// TODO: DOCUMENT HERE
router.get("/sender=/:senderId", post.getPostsBySenderId);

// TODO: DOCUMENT HERE
router.put("/:id", authenticationController.authenticate, post.updatePost);

export default router;
