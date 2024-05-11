import { Sequelize } from "sequelize";
import { ListingModel } from "./listings.js";
import { UserModel } from "./users.js";
import { ListingFeatureModel } from "./listingFeature.js";
import { FeatureToListingModel } from "./featureToDorm.js";

const sequelize = new Sequelize("sql6705724", "sql6705724", "anblkgUHbj", {
  dialect: "mysql",
  host: "sql6.freesqldatabase.com",
  port: "3306",
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
FeatureToListingModel.belongsTo(ListingFeatureModel, {
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
