const { User, Post } = require("../models");
const jwtUtils = require("../utils/jwt.utils");
// const user = require("../models/user");
// const models = require("../models");

module.exports.getAll = (req, res) => {
  Post.findAll({ include: User }) // retourne tous les post et les user associés à chaque post
    .then((post) => {
      const message = "La liste des posts a bien été récupérée.";
      res.json({ message, data: post });
    })
    .catch((error) => {
      const message =
        "La liste des posts n'a pas pu être récupérée. Réessayez dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

module.exports.createPost = async (req, res) => {
  // try {
  //   const user = await User.findOne({
  //     attributes: ["username", "id"],
  //     where: { id: req.body.userId},
  //   });

  //   const post = await Post.create({

  //     userId: req.body.userId,
  //     post_content: req.body.post_content,

  //   });
  //   console.log(req.body.userId);

  //   post.data = user.data;
  //   res.status(201).json({ post: post });
  // } catch (error) {
  //   return res.status(500).send({ error: "erreur survenue" });
  // }

  const headerAuth = req.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth);
  console.log("id " + userId);

  const post_content = req.body.post_content;

  await User.findOne({
    where: { id: userId },
  })
    .then(async function (user) {
      if (user) {
        let user = await User.findOne({ where: { id: userId } });
        let newPost = await Post.create({
          post_content: post_content,
          UserId: user.id,
        });
        return res.status(201)({ newPost: newPost });
      } else {
        res.status(404).json({ error: "Utilisateur introuvable" });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ error: err });
    });

  // if (post_content === null) {
  //   return res
  //     .status(400)
  //     .send({ message: "Votre post ne peut pas être vide" });
  // }

  // const post = {
  //   UserId: UserId,
  //   post_content: post_content,
  // };

  // Post.create(post)
  //   .then((data) => {
  //     const msg = "post crée";
  //     res.status(200).json({ msg, data });
  //   })
  //   .catch((err) => res.status(500).json(err));
};
// await User.findOne({
//   where: { id: userId },
// })
//   .then(async function (user) {
//     if (user) {
//       const user = await User.findOne({ where: { id: userId } });
//       const newPost = await Post.create({
//         post_content: post_content,
//         UserId: user.id,
//       });
//       return res.status(201).json({ newPost: newPost });
//     } else {
//       res.status(404).json({ error: "Utilisateur introuvable" });
//     }
//   })
//   .catch((err) => {
//     return res.status(500).json({ error: "Erreur survenue"});
//   });

// try {
//   const user = await User.findOne({
//     where: { id: req.params.id },
//   });

//   const post = {
//     userId: userId,
//     post_content: post_content,

//   };

//   Post.create(post)
//   .then((data) => {
//     const msg = "post crée";
//     res.status(201).json({ msg, data });
//   });
// } catch (error) {
//   console.log(error);
//   res.status(400).json({ réponse: "L'utilisateur n'existe pas" });
// }

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
        const message = `Le post ${post.title} a bien été modifié.`;
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
