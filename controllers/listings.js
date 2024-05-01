import { ListingModel } from "../models/listings.js";

export const insertListing = async (req, res) => {
  try {
    const info = {
      user_ID: req.body.user_Id,
      listingName: req.body.listingName,
      rentType: req.body.rentType,
      address: req.body.address,
      availability: req.body.availability,
      description: req.body.description,
      minimum_rent: req.body.minimum_rent,
      ideal_price: req.body.ideal_price,
      room_image: req.body.room_image,
    };

    const listing = await ListingModel.create(info);
    console.log("user", listing);
    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
