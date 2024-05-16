import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql6705724", "sql6705724", "anblkgUHbj", {
  dialect: "mysql",
  host: "sql6.freesqldatabase.com",
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
