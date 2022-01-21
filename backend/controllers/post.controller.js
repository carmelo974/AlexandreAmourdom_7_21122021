const { User, Post } = require("../models");
const jwtUtils = require("../utils/jwt.utils");
// const user = require("../models/user");
// const models = require("../models");

module.exports.getAll = async (req, res) => {
  // Post.findAll({ include: User }) // retourne tous les post et les user associés à chaque post
  //   .then((post) => {
  //     const message = "La liste des posts a bien été récupérée.";
  //     res.json({ message, data: post });
  //   })
  //   .catch((error) => {
  //     const message =
  //       "La liste des posts n'a pas pu être récupérée. Réessayez dans quelques instants";
  //     res.status(500).json({ message, data: error });
  //   });
  // try {
  //   const posts = await Post.findAll();

  //   return res.json(posts);
  // } catch (err) {
  //   return res.status(500).json(err);
  // }
  Post.findAll({ include: [{ model: User, as: "user" }] })
    .then(function (posts) {
      if (posts) {
        res.status(200).json({ posts: posts });
      } else {
        res.status(404).json({ error: "no post found" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.createPost = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth);
  const post_file = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "";
  

  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    const post = await Post.create({
      userId: userId,
      post_content: req.body.post_content,
      post_file: post_file,
      userName: user.username,
    });

    return res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ réponse: "L'utilisateur n'existe pas" });
  }
};

module.exports.updatePost = (req, res) => {
  const id = req.params.id;
  Post.update(req.body, {
    where: { id: id },
  })
    .then((_) => {
      return Post.findByPk(id).then((post) => {
        //return permet de gérer l'erreur 500 du dernier bloc catch pr éviter de dupliquer 2 blocs catch
        if (post === null) {
          const message =
            "Le post demandé n'existe pas. Réessayez avec un autre identifiant. ";
          return res.status(404).json({ message });
        }
        const message = `Le post a bien été modifié.`;
        res.json({ message, data: post });
      });
    })
    .catch((error) => {
      const message =
        "Le post n'a pas pu être modifié. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

module.exports.deletePost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        const message =
          "Le post demandé n'existe pas. Réessayez avec un autre identifiant. ";
        return res.status(404).json({ message });
      }
      const postDeleted = post;
      return Post.destroy({
        where: { id: post.id },
      }).then((_) => {
        const message = `Le post  a bien été supprimé.`;
        res.json({ message, data: postDeleted });
      });
    })
    .catch((error) => {
      const message =
        "Le post n'a pas pu être supprimé. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};
