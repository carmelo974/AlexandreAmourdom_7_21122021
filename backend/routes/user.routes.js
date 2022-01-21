const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller")
const auth = require("../middleware/auth.middleware")
const multer = require("multer")
const upload = multer()

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateOne);
router.delete("/:id", userController.deleteUser);

//upload
router.post("/upload", upload.single("image"), uploadController.uploadProfil)

module.exports = router;
