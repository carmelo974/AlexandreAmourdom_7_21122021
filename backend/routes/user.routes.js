const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

const auth = require("../middleware/auth.middleware");
const multerUser = require("../middleware/multer-config");
const rateLimit = require("../middleware/rateLimit")


//auth
router.post("/register", authController.signUp);
router.post("/login", rateLimit, authController.signIn);
router.get("/logout", authController.logout);

//user
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);
router.put("/:id", auth, userController.updateOne);
router.delete("/:id", auth, userController.deleteUser);

//upload
router.post("/upload/:id", multerUser, userController.uploadPicture);

module.exports = router;
