import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sequelize-prac", "root", "arwin123", {
  dialect: "mysql",
});

const FeatureToListingModel = sequelize.define("FeaturetoListing", {
  featureId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dormId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

await sequelize.sync();

export { FeatureToListingModel };
