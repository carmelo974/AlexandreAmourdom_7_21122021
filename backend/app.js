//Imports
const express = require("express");
const cors = require("cors");

//sécurité
const helmet = require("helmet"); // sécurise les informations présentes dans le Header
const xssClean = require("xss-clean");

//Variables routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const { sequelize } = require("./models");
require("dotenv").config({ path: "./config/.env" });

//Server
const app = express();
const path = require("path");

app.use(helmet());

let corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(xssClean());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);

  await sequelize.authenticate();
  console.log("Database connected");
});
