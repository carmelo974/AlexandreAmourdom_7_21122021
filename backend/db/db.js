const { Sequelize } = require("sequelize");

module.exports = new Sequelize("groupomania_V4", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});
