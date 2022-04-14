require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: "groupomania_V4",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
