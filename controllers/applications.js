import { ApplyModel } from "../models/apply.js";

export const createApplicationForListing = async (req, res) => {
    try {
        const {dormId, user_ID, rent, status } = req.body;
    
        // Validate the incoming data
        if (!dormId || !user_ID || !rent || !status) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        // Insert data into Apply table
        const apply = await ApplyModel.create({
          user_ID : user_ID,
          dormId: dormId,
          rent: rent,
          status: status,
        });
    
        console.log(apply)
        res.status(201).json({ message: "Application submitted successfully" });
      } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ error: "Failed to submit application" });
      }
};
