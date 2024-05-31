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

const UserModel = sequelize.define("User", {
  user_ID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
  },
  contactNum: {
    type: DataTypes.STRING,
  },
});

await sequelize.sync();

export { UserModel };
