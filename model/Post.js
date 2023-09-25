const { sq } = require("../configSQL/db");
const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

const PostSchema = sq.define("Posts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  project_id: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
  },
  actions: {
    type: DataTypes.STRING,
    defaultValue: "ready",
  },

  identifier: {
    type: DataTypes.STRING,
  },

  qty: {
    type: DataTypes.INTEGER,
  },
  symbol: {
    type: DataTypes.STRING,
  },
  tokenPrice: {
    type: DataTypes.INTEGER,
  },
  supply: {
    type: DataTypes.INTEGER,
  },
  tokenDescription: {
    type: DataTypes.STRING,
  },
  startSaleDate: {
    type: DataTypes.STRING,
  },
  endSaleDate: {
    type: DataTypes.STRING,
  },
  distributionDate: {
    type: DataTypes.STRING,
  },
  rentVersementDate: {
    type: DataTypes.STRING,
  },
  rentPrice: {
    type: DataTypes.INTEGER,
  },
  zipCode: {
    type: DataTypes.INTEGER,
  },
  location: {
    type: DataTypes.STRING,
  },
  surface: {
    type: DataTypes.INTEGER,
  },
  secondMarket: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

PostSchema.sync().then(() => {
  console.log("PostSchema Model synced");
});

module.exports = PostSchema;
