import express from "express";
const router = express.Router();
import * as listingController from "../controllers/listings.js";
import * as applicationsController from "../controllers/applications.js";

router.route("/new").post(listingController.insertListing);
router.route("/read").get(listingController.getListings);
router
  .route("/:dormId")
  .get(listingController.getListing)
  .delete(listingController.deleteListing);
router.route("/edit/:dormId").put(listingController.editListing);
router
  .route("/:dormId/applications")
  .post(applicationsController.createApplicationForListing)
  .get(applicationsController.readApplicationForListing)
  .put(applicationsController.updateApplicationForListing);
export default router;
