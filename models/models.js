import { Sequelize } from "sequelize";
import { ListingModel } from "./listings.js";
import { UserModel } from "./users.js";
import { ListingFeatureModel } from "./listingFeature.js";
import { FeatureToListingModel } from "./featureToDorm.js";
import { ApplyModel } from "./apply.js";
import * as dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_NAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  }
);

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
};
