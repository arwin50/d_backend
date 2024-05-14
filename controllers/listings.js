import { Op } from "sequelize";
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

export const getListings = async (req, res) => {
  try {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    let randomListings = shuffle(await ListingModel.findAll()).slice(0, 5);
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

      listingsWithFeatures.push({
        dormId: listing.dormId,
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

    const featureNames = features.map(
      (feature) => feature.ListingFeature.featureName
    );

    const listing = {
      user_ID: listings[0].user_ID,
      dormId: listings[0].dormId,
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

    console.log(listing);

    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editListing = async (req, res) => {
  try {
    const listing = ListingModel.findOne({
      where: { dormId: req.body.dormId },
    });

    await ListingModel.update(
      {
        listingName: req.body.listingName,
        rentType: req.body.rentType,
        address: req.body.address,
        availability: req.body.availability,
        description: req.body.description,
        minimum_rent: req.body.minimum_rent,
        ideal_price: req.body.ideal_price,
        room_image: req.body.room_image,
      },
      { where: { dormId: req.params.dormId } }
    );

    const roomAmenities = req.body.roomAmenities;

    await FeatureToListingModel.destroy({
      where: {
        dormId: req.params.dormId,
      },
    });

    const featureIdsSubquery = await FeatureToListingModel.findAll({
      attributes: ["featureId"],
    }).then((results) => results.map((result) => result.featureId));

    const deletedRows = await ListingFeatureModel.destroy({
      where: {
        featureId: {
          [Op.notIn]: featureIdsSubquery,
        },
      },
    });

    console.log("Deleted Rows: ", deletedRows);

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
          dormId: req.params.dormId,
        });
      } else {
        const newAmenity = await ListingFeatureModel.create({
          featureName: amenity,
        });
        await FeatureToListingModel.create({
          featureId: newAmenity.featureId,
          dormId: req.params.dormId,
        });
      }
    }

    return res.status(200).json({ message: "Listing updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    await ListingModel.destroy({
      where: {
        dormId: req.params.dormId,
      },
    });

    await FeatureToListingModel.destroy({
      where: {
        dormId: req.params.dormId,
      },
    });

    const allFeatures = await FeatureToListingModel.findAll({
      attributes: ["featureId"],
    }).then((results) => results.map((result) => result.featureId));

    const deletedRows = await ListingFeatureModel.destroy({
      where: {
        featureId: {
          [Op.notIn]: allFeatures,
        },
      },
    });

    console.log("Deleted Rows: ", deletedRows);

    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
