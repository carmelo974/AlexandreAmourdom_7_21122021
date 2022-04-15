const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: "groupomania_V4",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
