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

const ListingModel = sequelize.define("Listing", {
  user_ID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dormId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  listingName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  room_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

await sequelize.sync();

export { ListingModel };
