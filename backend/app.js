const express = require("express");
const cors = require ("cors")
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const { sequelize } = require("./models");
require("dotenv").config({ path: "./config/.env" });
// const { checkUser, requireAuth } = require("./middleware/auth.middleware");



const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((_req, res, next) => {
  // ressoures partagées depuis tte les origines
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    // indication des headers utilisés
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    // indication des méthodes autorisées pr les requête http
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.get("*", checkUser);
// app.get("/jwtid", requireAuth, (req, res) => {
//   res.status(200).send(res.locals.userId);
// });

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);



app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
  // await sequelize.sync({ force: true });
  await sequelize.authenticate();
  console.log("Database connected");
});
