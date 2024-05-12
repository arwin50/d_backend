import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.js";

router.route("/usermounted").get(userController.usermount);
router.route("/logout").get(userController.userlogout);
router.route("/user/:userId/edit").put(userController.updateUser)

export default router;
