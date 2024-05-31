import { application } from "express";
import { ApplyModel } from "../models/apply.js";
import { UserModel } from "../models/users.js";
import { Op } from "sequelize";
import { ListingModel } from "../models/listings.js";

export const createApplicationForListing = async (req, res) => {
  try {
    const { dormId, user_ID, rent, status } = req.body;

    // Validate the incoming data
    if (!dormId || !user_ID || !rent || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert data into Apply table
    const apply = await ApplyModel.create({
      user_ID: user_ID,
      dormId: dormId,
      rent: rent,
      status: status,
    });

    console.log("text", apply);
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
};

export const readApplicationForListing = async (req, res) => {
  try {
    const applications = await ApplyModel.findAll({
      include: {
        model: UserModel,
        attributes: ["fullName"],
      },
    });
    console.log(applications);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

export const updateApplicationForListing = async (req, res) => {
  console.log(req.body.decision);
  try {
    const { user_ID, rent, decision, dormId } = req.body;
    const updated = await ApplyModel.update(
      {
        user_ID: user_ID,
        dormId: dormId,
        rent: rent,
        status: decision,
      },
      { where: { [Op.and]: [{ dormId: dormId }, { user_ID: user_ID }] } }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const userApplications = await ApplyModel.findAll({
      where: { user_ID: req.params.userId },
    });

    console.log(userApplications);
    const dormApplications = [];
    if (userApplications.length > 0) {
      for (let application of userApplications) {
        const dorm = await ListingModel.findOne({
          where: { dormId: application.dataValues.dormId },
        });

        const user = await UserModel.findOne({
          where: { user_ID: dorm.user_ID },
        });

        const listing = {
          listingName: dorm.listingName,
          fullName: user.fullName,
          room_image: dorm.room_image,
          dormId: dorm.dormId,
          address: dorm.address,
          status: application.dataValues.status,
        };
        dormApplications.push(listing);
      }
    }

    console.log(dormApplications);
    res.json(dormApplications);
  } catch (error) {
    console.error(error);
  }
};
