import { DataTypes, Sequelize } from "sequelize";
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
