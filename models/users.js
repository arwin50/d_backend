import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sequelize-prac", "root", "dlouisefermin321.", {
  dialect: "mysql",
});

export const createUserRelation = () => {
  const User = sequelize.define("User", {
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

  sequelize.sync();
  return User;
};

export const UserModel = createUserRelation();
