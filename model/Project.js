const { sq } = require("../configSQL/db");
const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

const ProjectSchema = sq.define("Projects", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  user_id: {
    type: DataTypes.INTEGER,
  },

});

ProjectSchema.sync().then(() => {
  console.log("ProjectSchema Model synced");
});

module.exports = ProjectSchema;
