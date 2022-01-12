const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller")

router.post('/comment/:postId', commentController.createComment);
router.get("/:id",commentController.getById)
router.put("/:id", commentController.updateComment)
router.delete("/:id", commentController.deleteComment)

module.exports= router