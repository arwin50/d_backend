import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql12707675", "sql12707675", "EVWZ3DhMFZ", {
  dialect: "mysql",
  host: "sql12.freesqldatabase.com",
  port: "3306",
});

const ApplyModel = sequelize.define("Apply", {
  application_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dormId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await sequelize.sync();

export { ApplyModel };
