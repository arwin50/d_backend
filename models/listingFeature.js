import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql6705724", "sql6705724", "anblkgUHbj", {
  dialect: "mysql",
  host: "sql6.freesqldatabase.com",
  port: "3306",
});

const ListingFeatureModel = sequelize.define("ListingFeature", {
  featureId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  featureName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

await sequelize.sync();

export { ListingFeatureModel };
