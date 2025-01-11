import express from "express";
import authentication from "../controller/authenticationController";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication API
 */

router.post("/login", authentication.login);
router.post("/logout", authentication.logout);
router.post("/registration", authentication.registration);
router.post("/refreshToken", authentication.refreshToken);

export default router;
