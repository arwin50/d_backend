import { Op } from "sequelize";
import { UserModel } from "../models/users.js";
import { FeatureToListingModel } from "../models/featureToDorm.js";
import { ListingFeatureModel } from "../models/listingFeature.js";
import { ListingModel } from "../models/listings.js";

export const getUserListings = async (req, res) => {
  console.log(req.params);
  try {
    const randomListings = await ListingModel.findAll({
      where: {
        user_ID: req.params.userId,
      },
    });
    console.log(randomListings);

    const listingsWithFeatures = [];

    for (const listing of randomListings) {
      const features = await FeatureToListingModel.findAll({
        where: {
          dormId: listing.dormId,
        },
        include: ListingFeatureModel,
      });

      const featureNames = features.map(
        (feature) => feature.ListingFeature.featureName
      );

      const user = await UserModel.findOne({
        where: { user_ID: listing.user_ID },
      });

      listingsWithFeatures.push({
        dormId: listing.dormId,
        room_image: listing.room_image,
        listingName: listing.listingName,
        fullName: user.fullName,
        address: listing.address,
        featureNames: featureNames,
      });
    }

    console.log("listingsWithFeatures: ", listingsWithFeatures);

    res.json(listingsWithFeatures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
