const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
 const authAdmin = require("../middleware/authAdmin");
const multer = require("../middleware/multer-config");

router.get("/", postController.getAll);
router.post("/", multer, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", auth, authAdmin, postController.deletePost);

module.exports = router;
