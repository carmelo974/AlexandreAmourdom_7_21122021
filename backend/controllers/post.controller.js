const { User, Post, Comment } = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const fs = require("fs");
const { route } = require("../routes/post.routes");
require("dotenv").config();

module.exports.getAll = async (req, res) => {
  Post.findAll({
    include: [{ model: User, as: "user" }, { model: Comment }],
    order: [["createdAt", "DESC"]],
  })
    .then(function (posts) {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "aucun post trouvé" });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
};

module.exports.createPost = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth);

  const post_file = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";

  //try {
  const user = await User.findOne({
    where: { id: userId },
  });

  const post = await Post.create({
    userId: userId,
    post_content: req.body.post_content,
    post_file: post_file,
  });

  //  if(req.file){
  //   post_file = `./images/${req.file.filename}`
  // } else{
  //   post_file = null
  // }

  return res.json(post);
  /*} catch (error) {
    res.status(400).json({ réponse: "L'utilisateur n'existe pas" });
  }*/
};

module.exports.updatePost = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth);
  const { isAdmin } = jwtUtils.getAdmin(headerAuth);
  const id = req.params.id;

  Post.findByPk(id)
    .then((post) => {
      if (post === null) {
        const message =
          "Le post demandé n'existe pas. Réessayez avec un autre identifiant. ";
        return res.status(404).json({ message });
      }

      if (userId === post.userId || isAdmin === true) {
        post.update(req.body);
        const message = `Le post a bien été modifié.`;
        return res.status(200).json({ message, data: post });
      } else {
        const message = "Vous n'êtes pas autorisée";
        return res.status(401).json({ message });
      }
    })
    .catch((error) => {
      const message =
        "Le post n'a pas pu être modifié. Réessayez dans quelques instants.";
      return res.status(500).json({ message, data: error });
    });
};

module.exports.deletePost = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth);
  const { isAdmin } = jwtUtils.getAdmin(headerAuth);
  console.log(isAdmin);

  await User.findOne({
    where: { id: userId },
  })

    .then(async () => {
      try {
        const post = await Post.findOne({ where: { id: req.params.id } });
        console.log(post.userId);
        console.log(userId);

        if (userId == post.userId || isAdmin === true) {
          const filename = post.post_file.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            post.destroy();
            return res.json({ message: "Post supprimé" });
          });
        } else {
          res.status(401).json({ error: "Vous n'êtes pas autorisé" });
        }
      } catch (err) {
        return res.status(500).json({ err: "erreur serveur" });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ error: err });
    });
};
