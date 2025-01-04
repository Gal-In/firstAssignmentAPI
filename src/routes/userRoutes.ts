import express from "express";
import users from "../controller/userController";
const router = express.Router();

router.post("/", users.addNewUser);
router.get("/", users.getAllUsers);
router.put("/:id", users.updateUserEmail);
router.put("/:id", users.updateUserPassword);
router.delete("/:id", users.deleteUser);

export default router;
