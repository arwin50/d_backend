import express from "express";
const router = express.Router();
import * as listingController from "../controllers/listings.js";

router.route("/new").post(listingController.insertListing);

export default router;
