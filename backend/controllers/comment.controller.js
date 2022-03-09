const { User, Comment, Post } = require("../models");
const jwtUtils = require("../utils/jwt.utils");

module.exports.createComment = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth);

  const postId = req.params.id;
  console.log("postId " + postId);

  if (postId <= 0) {
    return res.status(400).json({ error: "Paramètre invalide" });
  }

  const comment = req.body.comment;

  await User.findOne({
    where: { id: userId },
  })
    .then(async function (user) {
      if (user) {
        let newComment = await Comment.create({
          userId,
          postId,
          userName: user.username,
          comment,
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
  console.log(id);

  Comment.findByPk(id, {
    include: ["user"],
  })
    .then((comment) => {
      const msg = "aucun commentaire trouvé";
      res.status(200).json({ msg, data: comment });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
};

module.exports.findAllComment = (req, res) => {
  Comment.findAll({
    attributes: ["PostId"],
  })
    .then(function (comments) {
      if (comments) {
        res.status(200).json({ comments: comments });
      } else {
        res.status(404).json({ error: "no post found" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.deleteComment = (req, res) => {
  const headerAuth = req.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth);
  const { isAdmin } = jwtUtils.getAdmin(headerAuth);

  const id = req.params.id;

  Comment.findByPk(id)
    .then((comment) => {
      if (userId == comment.userId || isAdmin == true) {
        comment.destroy();
        res.status(200).json({  message: "Commentaire supprimé" });
      } else {
        res.status(400).json({ error: "Vous n'êtes pas autorisé" });
      }
    })
    .catch(function (error) {
      return res.status(500).json({ error });
    });
};
