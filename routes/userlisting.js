import express from "express";
const router = express.Router();
import * as userlistingController from "../controllers/userlistings.js";
import * as applicationController from "../controllers/applications.js";

router.route("/:userId/listing").get(userlistingController.getUserListings);
router
  .route("/:userId/applications")
  .get(applicationController.getUserApplications);

export default router;
