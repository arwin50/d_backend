import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql12707675", "sql12707675", "EVWZ3DhMFZ", {
  dialect: "mysql",
  host: "sql12.freesqldatabase.com",
  port: "3306",
});

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
