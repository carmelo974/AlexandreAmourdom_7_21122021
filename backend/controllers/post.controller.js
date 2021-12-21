const { User, Post } = require("../models");
const user = require("../models/user");

module.exports.getAll = (req, res) => {
  Post.findAll()
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

module.exports.createPost = (req, res) => {
  const { post_title, post_content } = req.body;
//   const newPost = {
//     post_title: post_title,
//     post_content: post_content,
//   };
  Post.create(req.body)
    .then((post) => {
      const message = `Le post ${req.body.post_title} a bien été crée.`;
      res.json({ message, data: post, userId: user.id });
    })
    .catch((error) => {
      const message =
        "Le post n'a pas pu être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });

  //   const { userUuid, post_title, post_content } = req.body;
  //   try {
  //     const user = await User.findOne({ where: { uuid: userUuid } });

  //     const post = await Post.create({
  //       post_title: post_title,
  //       post_content: post_content,
  //       userId: user.id,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
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
        const message = `Le post avec l'identifiant n°${postDeleted.id} a bien été supprimé.`;
        res.json({ message, data: postDeleted });
      });
    })
    .catch((error) => {
      const message =
        "Le post n'a pas pu être supprimé. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};
