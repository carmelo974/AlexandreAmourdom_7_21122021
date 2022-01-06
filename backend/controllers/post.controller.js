const { User, Post } = require("../models");
// const user = require("../models/user");
// const models = require("../models");

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

module.exports.createPost = async (req, res) => {
  // const {userName, post_content} = req.body
  // const 

  // const newPost = {
  //   userName: userName,
  //   post_content: post_content
  // }
  // Post.create(newPost)
  // .then(()=>{
  //   const msg = "post créer"
  //   res.status(200).json({msg})
  // })
  // .catch((err)=> res.status(500).json(err))

} 
// const content = req.body.post_content;
// const userId = req.params.id;

// await User.findOne({
//   where: { id: userId },
// })
//   .then(async function (user) {
//     if (user) {
//       let user = await User.findOne({ where: { id: userId } });
//       let newPost = await Post.create({
//         content: content,
//         userId: user.id,
//         userName: user.username,
//       });
//       return res.status(201).json({ newPost: newPost });
//     } else {
//       res.status(404).json({ error: "Utilisateur introuvable" });
//     }
//   })
//   .catch(function (err) {
//     return res.status(500).json({ error: err });
//   });

// Post.create(req.body)
//   .then((post) => {
//     const message = `Le post a bien été crée.`;
//     res.json({ message, data: post });
//   })
//   .catch((error) => {
//     const message =
//       "Le post n'a pas pu être récupéré. Réessayez dans quelques instants.";
//     res.status(500).json({ message, data: error });
//   });
// };
// const post_title = _req.body.post_title;
// const post_content = _req.body.post_content;

//  User.findOne({
//   where: { userId: user.id },
// })
//   .then(async function (user) {
//     if (user) {
//       let user =  User.findOne({ where: { userId: user.id } });
//       let newPost =  Post.create({
//         post_title: post_title,
//         post_content: post_content,

//         UserId: user.id,
//       });
//       return res.status(201).json({ newPost: newPost });
//     } else {
//       res.status(404).json({ error: "Utilisateur introuvable" });
//     }
//   })
//   .catch(function (err) {
//     return res.status(500).json({ error: err });
//   });

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
