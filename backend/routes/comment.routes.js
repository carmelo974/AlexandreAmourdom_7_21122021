const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller")

router.post('/:id', commentController.createComment);
router.get("/:id",commentController.getById)
router.get("/", commentController.findAllComment)
router.delete("/:id", commentController.deleteComment)

module.exports= router