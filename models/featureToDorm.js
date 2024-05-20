import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql12707675", "sql12707675", "EVWZ3DhMFZ", {
  dialect: "mysql",
  host: "sql12.freesqldatabase.com",
  port: "3306",
});

const FeatureToListingModel = sequelize.define("FeaturetoListing", {
  featureId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  dormId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await sequelize.sync();

export { FeatureToListingModel };
