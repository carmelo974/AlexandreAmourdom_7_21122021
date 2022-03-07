const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const commentController = require("../controllers/comment.controller")

router.post('/:id',auth, commentController.createComment);
router.get("/:id",auth,commentController.getById)
router.get("/", auth,commentController.findAllComment)
router.delete("/:id",auth, commentController.deleteComment)

module.exports= router