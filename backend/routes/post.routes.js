const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");

const multer = require("../middleware/multer-config");

router.get("/", auth, postController.getAll);
router.post("/", auth, multer, postController.createPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth,  postController.deletePost);

module.exports = router;
