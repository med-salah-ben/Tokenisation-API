const { sq } = require("../configSQL/db");
const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

const UsersSchema = sq.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },

  name: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
  },
  pspWallet: {
    type: DataTypes.INTEGER,  
  },

  tokens:{
    type :DataTypes.ARRAY(DataTypes.INTEGER),
  }

  // employed: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false,
  // },
});

UsersSchema.sync().then(() => {
  console.log("Users Model synced");
});

module.exports = UsersSchema;
