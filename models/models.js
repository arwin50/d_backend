import { Sequelize } from "sequelize";
import { ListingModel } from "./listings.js";
import { UserModel } from "./users.js";
import { ListingFeatureModel } from "./listingFeature.js";
import { FeatureToListingModel } from "./featureToDorm.js";
import { ApplyModel } from "./apply.js";
import { ApplicationInfoModel } from "./applicationInfo.js";

const sequelize = new Sequelize("sql12707675", "sql12707675", "EVWZ3DhMFZ", {
  dialect: "mysql",
  host: "sql12.freesqldatabase.com",
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

ApplicationInfoModel.belongsTo(ApplyModel, {
  foreignKey: {
    name: "application_ID",
  },
});

ApplyModel.belongsTo(ApplicationInfoModel, {
  foreignKey: {
    name: "application_ID",
  },
});

ApplyModel.belongsTo(ListingModel, {
  foreignKey: {
    name: "dormId",
  },
});

ListingModel.hasMany(ApplyModel, {
  foreignKey: {
    name: "dormId",
  },
});

UserModel.hasMany(ApplyModel, {
  foreignKey: {
    name: "user_ID",
  },
});

ApplyModel.belongsTo(UserModel, {
  foreignKey: {
    name: "user_ID",
  },
});

await sequelize.sync();
export {
  ListingModel,
  UserModel,
  FeatureToListingModel,
  ListingFeatureModel,
  ApplyModel,
  ApplicationInfoModel,
};
