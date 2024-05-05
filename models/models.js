import { Sequelize } from "sequelize";
import { ListingModel } from "./listings.js";
import { UserModel } from "./users.js";
import { ListingFeatureModel } from "./listingFeature.js";
import { FeatureToListingModel } from "./featureToDorm.js";

const sequelize = new Sequelize("sequelize-prac", "root", "arwin123", {
  dialect: "mysql",
});

UserModel.hasMany(ListingModel, {
  foreignKey: {
    name: "user_ID",
  },
});
ListingModel.belongsTo(UserModel, {
  foreignKey: {
    name: "user_ID",
  },
});
ListingModel.hasMany(FeatureToListingModel, {
  foreignKey: {
    name: "dormId",
  },
});
FeatureToListingModel.belongsTo(ListingModel, {
  foreignKey: {
    name: "dormId",
  },
});
FeatureToListingModel.hasMany(ListingFeatureModel, {
  foreignKey: {
    name: "featureId",
  },
});

ListingFeatureModel.belongsTo(FeatureToListingModel, {
  foreignKey: {
    name: "featureId",
  },
});

await sequelize.sync();
export { ListingModel, UserModel, FeatureToListingModel, ListingFeatureModel };
