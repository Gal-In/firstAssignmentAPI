import express from "express";
import users from "../controller/userController";
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

router.get("/", users.getAllUsers);
router.put("/:id", users.updateUserEmail);
router.put("/:id", users.updateUserPassword);
router.delete("/:id", users.deleteUser);

export default router;
