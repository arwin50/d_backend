import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sql6705724", "sql6705724", "anblkgUHbj", {
  dialect: "mysql",
  host: "sql6.freesqldatabase.com",
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
  minimum_rent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ideal_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  room_image: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
});

await sequelize.sync();

export { ListingModel };
