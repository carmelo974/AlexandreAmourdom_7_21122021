const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { sequelize } = require("./models");
require("dotenv").config({ path: "./config/.env" });
const { checkUser } = require("./middleware/auth.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("*", checkUser);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes)

// app.post("/users", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.create({ username, password });
//     return res.json(user);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// app.get("/users", async (req,res) => {
//     try{
//         const users = await User.findAll()
//         return res.json(users)
//     } catch(err) {
//         console.log(err)
//         return res.status(500).json({error: "something wrong"})
//     }
// })

// app.get("/users/:id", async (req,res) => {
//     const id = req.params.id
//     try{
//         const users = await User.findOne({
//             where: {id}
//         })
//         return res.json(users)
//     } catch(err) {
//         console.log(err)
//         return res.status(500).json({error: "something wrong"})
//     }
// })

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
  // await sequelize.sync({ force: true });
  await sequelize.authenticate();
  console.log("Database connected");
});
