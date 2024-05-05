import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sequelize-prac", "root", "arwin123", {
  dialect: "mysql",
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

export { UserModel };
