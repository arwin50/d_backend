import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sequelize-prac", "root", "arwin123", {
  dialect: "mysql",
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

export { ListingModel };
