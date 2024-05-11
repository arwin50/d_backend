import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql6705724", "sql6705724", "anblkgUHbj", {
  dialect: "mysql",
  host: "sql6.freesqldatabase.com",
  port: "3306",
});

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
