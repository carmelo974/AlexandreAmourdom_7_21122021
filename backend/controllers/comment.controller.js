const { User, Comment, Post } = require("../models");

module.exports.createComment = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  const comment = req.body.comment;
  await User.findOne({
    where: { id: req.body.userId },
  })
    .then(async function (user) {
      if (user) {
        let newComment = await Comment.create({
          userId: userId,
          postId: postId,
          comment: comment,
          timestamp: new Date().getTime()
        });
        return res.status(201).json({ newComment: newComment });
      } else {
        return res.status(404).json({ error: "Utilisateur introuvable" });
      }
    })
    .catch(function (error) {
      return res.status(500).json({ error });
    });
};

module.exports.getById = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id, {
    include: ['user'],
  })
    .then((comment) => {
      const msg = 'Comment found';
      res.status(200).json({ msg, data: comment });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
};

module.exports.updateComment = (req, res) => {};

module.exports.deleteComment = (req, res) => {};
