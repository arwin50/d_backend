import express from "express";
const router = express.Router();
import * as userlistingController from "../controllers/userlistings.js";

router.route("/:userId/listing").get(userlistingController.getUserListings);

export default router;
