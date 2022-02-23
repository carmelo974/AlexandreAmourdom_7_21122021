const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const { sequelize } = require("./models");
require("dotenv").config({ path: "./config/.env" });
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser")

//sécurité
const helmet = require("helmet"); // sécurise les informations présentes dans le Header

const app = express();
const path = require("path");

app.use(helmet());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin",process.env.CLIENT_URL);
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

let corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Cookie-session
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); //1h

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    cookie: {
      secure: true,
      //garantie que le navigateur envoie le cookie sur HTTPS
      httpOnly: true,
      /* Garantit que le cookie n’est envoyé que sur HTTP(S), pas au JavaScript du client, 
      ce qui renforce la protection contre les attaques de type cross-site scripting. */
      domain: "http://localhost:3000/",
      expires: expiryDate,
      //utilise une date d'expitation pour les cookies persistants
    },
  })
);

// const expressJson = express.json();
// const bodyParser = express.urlencoded({ extended: true });
// app.use([expressJson, bodyParser]);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use("/image", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
  await sequelize.sync({ force: false });
  // await sequelize.authenticate();
  console.log("Database connected");
});
