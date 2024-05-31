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
