const express = require("express");
const cors = require("cors");


const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const { sequelize } = require("./models");
require("dotenv").config({ path: "./config/.env" });

//sécurité
const helmet = require("helmet"); // sécurise les informations présentes dans le Header

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

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.use("/api/user",  userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));





app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
  //  await sequelize.sync({force: true});
  await sequelize.authenticate();
  console.log("Database connected");
});
