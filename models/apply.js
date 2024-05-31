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

const ApplyModel = sequelize.define("Apply", {
  user_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dormId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await sequelize.sync();

export { ApplyModel };
