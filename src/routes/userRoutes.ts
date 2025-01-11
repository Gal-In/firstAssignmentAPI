import express from "express";
import users from "../controller/userController";
import authenticationController from "../controller/authenticationController";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Db generated user id
 *         username:
 *           type: string
 *           description: The user username
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password, saved after encryption
 *         refreshTokens:
 *           type: array
 *           items:
 *              type: string
 *           description: The user refresh tokens, created using the authentication requests
 *       example:
 *         _id: 67813c84b8f996b54a5e04ca
 *         username: koren
 *         email: koren@gmail.com
 *         password: $2b$10$OgtMmMCzD3s29LUk6HeyP.Wksi0eAGRYKDvNgBklU476hPDqf45m.
 *         refreshTokens: []
 */

// TODO: add document
router.get("/", users.getAllUsers);
// TODO: add document
router.get("/:id", users.getUserById);
// TODO: add document
router.put("/", authenticationController.authenticate, users.updateUserDetails);
// TODO: add document
router.delete("/", authenticationController.authenticate, users.deleteUser);

export default router;
