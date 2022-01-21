const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const { sequelize } = require("./models");
require("dotenv").config({ path: "./config/.env" });
// const { checkUser, requireAuth } = require("./middleware/auth.middleware");

//sécurité
const helmet = require("helmet"); // sécurise les informations présentes dans le Header

const app = express();
const path = require("path");

app.use(helmet());

// app.use(cors());

// app.use((_req, res, next) => {
//   // ressoures partagées depuis tte les origines
//   res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
//   res.setHeader(
//     // indication des headers utilisés
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     // indication des méthodes autorisées pr les requête http
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// const expressJson = express.json();
// const bodyParser = express.urlencoded({ extended: true });
// app.use([expressJson, bodyParser]);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
  await sequelize.sync({ force: false });
  // await sequelize.authenticate();
  console.log("Database connected");
});
