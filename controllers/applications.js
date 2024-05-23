import { Op } from "sequelize";
import { UserModel } from "../models/users.js";
import { FeatureToListingModel } from "../models/featureToDorm.js";
import { ListingFeatureModel } from "../models/listingFeature.js";
import { ListingModel } from "../models/listings.js";

export const createApplicationForListing = async (req, res) => {
    try {
        const { dormId, userId, priceOffer, decision } = req.body;
    
        // Validate the incoming data
        if (!dormId || !userId || !priceOffer || !decision) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        // Insert data into Apply table
        const apply = await ApplyModel.create({
          dormId,
          userId,
          priceOffer,
          decision,
        });
    
        // Insert data into ApplicationInfo table
        await ApplicationInfoModel.create({
          application_ID: apply.application_ID,
          rent: priceOffer, // Assuming rent and priceOffer are the same
          status: decision,
        });
    
        res.status(201).json({ message: "Application submitted successfully" });
      } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ error: "Failed to submit application" });
      }
};
