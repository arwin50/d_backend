import { Op } from "sequelize";
import { UserModel } from "../models/users.js";
import { FeatureToListingModel } from "../models/featureToDorm.js";
import { ListingFeatureModel } from "../models/listingFeature.js";
import { ListingModel } from "../models/listings.js";
import { ImageUpload } from "../cloudinary/cloudinary.js";
import { ApplyModel } from "../models/apply.js";

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
      rent: req.body.rent,
      room_image: req.body.base64,
    };

    if (info.room_image) {
      const url = await ImageUpload(info.room_image);
      info.room_image = url;
      console.log(url);
    }

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
    const { name, address, amenity, rent } = req.query;
    let randomListings;

    if (name && name.length > 0) {
      randomListings = await ListingModel.findAll({
        where: { listingName: { [Op.like]: `%${name}%` } },
      });
    } else if (address && address.length > 0) {
      randomListings = await ListingModel.findAll({
        where: { address: { [Op.like]: `%${address}%` } },
      });
    } else if (rent) {
      randomListings = await ListingModel.findAll({
        where: { rent: { [Op.lt]: rent } },
      });
    } else if (amenity && amenity.length > 0) {
      const features = await ListingFeatureModel.findAll({
        where: {
          featureName: { [Op.like]: `%${amenity}%` },
        },
        include: FeatureToListingModel,
      });

      const dormIds = features.map(
        (feature) => feature.dataValues.FeaturetoListing.dataValues.dormId
      );
      if (dormIds.length > 0) {
        randomListings = await ListingModel.findAll({
          where: { dormId: { [Op.in]: [dormIds] } },
        });
      }
    } else {
      randomListings = await shuffle(ListingModel.findAll());
    }
    const listingsWithFeatures = [];

    if (randomListings) {
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

    if (listings.length !== 1) {
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
      rent: listings[0].rent,
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
    let url = "";
    if (req.body.base64) {
      url = await ImageUpload(req.body.base64);
    }

    await ListingModel.update(
      {
        listingName: req.body.listingName,
        rentType: req.body.rentType,
        address: req.body.address,
        availability: req.body.availability,
        description: req.body.description,
        rent: req.body.rent,
        room_image: url,
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

    const allApplications = await ApplyModel.findAll({
      where: { dormId: req.params.dormId },
    }).then((results) => results.map((result) => result.dormId));

    await ApplyModel.destroy({
      where: {
        dormId: {
          [Op.in]: allApplications,
        },
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
