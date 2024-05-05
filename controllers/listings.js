import { FeatureToListingModel } from "../models/featureToDorm.js";
import { ListingFeatureModel } from "../models/listingFeature.js";
import { ListingModel } from "../models/listings.js";

export const insertListing = async (req, res) => {
  console.log(req.body.amenity);
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
    const roomAmenities = req.body.roomAmenities;

    const newListing = await ListingModel.create(info);

    // Iterate over roomAmenities array
    for (let amenity of roomAmenities) {
      console.log(amenity);
      const existingAmenity = await ListingFeatureModel.findOne({
        where: {
          featureName: amenity,
        },
      });
      if (existingAmenity) {
        await FeatureToListingModel.create({
          featureId: existingAmenity.featureId,
          dormId: newListing.dormId,
        });
      } else {
        const newAmenity = await ListingFeatureModel.create({
          featureName: amenity,
        });
        await FeatureToListingModel.create({
          featureId: newAmenity.featureId,
          dormId: newListing.dormId,
        });
      }
    }

    console.log("Created listing:", newListing);
    res.json(newListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
