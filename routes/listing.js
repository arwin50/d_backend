import express from "express";
const router = express.Router();
import * as listingController from "../controllers/listings.js";

router.route("/new").post(listingController.insertListing);
router.route("/read/:dormId").get(listingController.getListing);

export default router;
