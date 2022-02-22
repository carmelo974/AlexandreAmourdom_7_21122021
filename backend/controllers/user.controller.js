const { sequelize, User } = require("../models");

module.exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((user) => {
      const message = "La liste des utilisateurs a bien été récupérée.";
      res.json({ message, data: user });
    })
    .catch((error) => {
      const message =
        "La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

module.exports.getOneUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message =
          "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant. ";
        return res.status(404).json({ message });
      }
      const message = "Un utilisateur a bien été trouvé.";
      res.json({ message,  user });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

module.exports.updateOne = async (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((_) => {
      return User.findByPk(id).then((user) => {
        //return permet de gérer l'erreur 500 du dernier bloc catch pr éviter de dupliquer 2 blocs catch
        if (user === null) {
          const message =
            "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant. ";
          return res.status(404).json({ message });
        }
        const message = `L'utilisateur ${user.username} a bien été modifié.`;
        res.json({ message, data: user });
      });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

module.exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message =
          "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant. ";
        return res.status(404).json({ message });
      }
      const userDeleted = user;
      return User.destroy({
        where: { id: user.id },
      }).then((_) => {
        const message = `L'utilisateur ${userDeleted.username} a bien été supprimé.`;
        res.json({ message, data: userDeleted });
      });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

module.exports.uploadPicture= (req,res)=>{
  const id = req.params.id;

  const userImage = {
    image: '',
  };

  if (req.file) {
    userImage.image = `./uploads/profil/${req.file.filename}`;
  }

  User.findByPk(id)
    .then((user) => {
      user.image = userImage.image;
      user
        .save()
        .then(() => res.status(200).json({ msg: 'image updated' }))
        .catch((err) => res.status(400).json({ err: err.message }));
    })
    .catch((err) => res.status(500).json({ err: err.message }));
}