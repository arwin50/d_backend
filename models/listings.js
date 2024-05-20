import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql12707675", "sql12707675", "EVWZ3DhMFZ", {
  dialect: "mysql",
  host: "sql12.freesqldatabase.com",
  port: "3306",
});

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
