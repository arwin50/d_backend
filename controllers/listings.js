import { UserModel } from "../models/users.js";
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

export const getListing = async (req, res) => {
  console.log(req.params.dormId);
  try {
    const listings = await ListingModel.findAll({
      where: {
        dormId: req.params.dormId,
      },
    });

    if (listings.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const users = await UserModel.findAll({
      where: {
        user_ID: listings[0].user_ID,
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const features = await FeatureToListingModel.findAll({
      where: {
        dormId: req.params.dormId,
      },
      include: ListingFeatureModel,
      logging: console.log,
    });

    console.log("Features:", features);

    const featureNames = features.map(
      (feature) => feature.ListingFeature.featureName
    );

    console.log(featureNames);

    const listing = {
      user_ID: listings[0].user_ID,
      listingName: listings[0].listingName,
      rentType: listings[0].rentType,
      address: listings[0].address,
      availability: listings[0].availability,
      description: listings[0].description,
      minimum_rent: listings[0].minimum_rent,
      ideal_price: listings[0].ideal_price,
      room_image: listings[0].room_image,
      createdAt: listings[0].createdAt,
      user_email: users[0].email,
      user_fullName: users[0].fullName,
      user_contactNo: users[0].contactNo,
      features: featureNames,
    };

    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
