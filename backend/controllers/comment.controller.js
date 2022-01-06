const { User, Comment, Post } = require("../models");

module.exports.createComment = async (req, res) => {
  // const postId = req.params.id;
  // const comment = req.body.comment;

  // await User.findOne({
  //   where: { id: req.body.userId },
  // })
  //   .then(async function (user) {
  //     if (user) {
  //       let newComment = await Comment.create({
  //         userId: req.body.id,
  //         postId: postId,
  //         userName: user.username,
  //         comment: comment,
  //       });
  //       return res.status(201).json({ newComment: newComment });
  //     } else {
  //       return res.status(404).json({ error: "Utilisateur introuvable" });
  //     }
  //   })
  //   .catch(function (error) {
  //     return res.status(500).json({ error });
  //   });
  const comment = req.body.comment;
  const  postId  = req.params.id

  Comment.create(comment)
    .then((Comment) => {
      const msg = `Created Comment`;
      res.status(200).json({ msg });

      console.log(Comment.id);
      const addComment = { commentId: Comment.id };

      // Post.update(addComment, { where: { id: postId } });
    })
    .catch((err) => res.status(500).json(err));
};
