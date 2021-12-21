const { User } = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const passwordValidator = require("password-validator");

// schema du mot de passe
const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(10) // longueur min
  .is()
  .max(100) // longueur max
  .has()
  .uppercase() // Doit avoir au moins une majuscule
  .has()
  .lowercase() // Doit avoir au moins une minuscule
  .has()
  .digits() // Doit avoir au moins un chiffre
  .has()
  .not()
  .spaces() // Ne doit pas avoir d'espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Mdp interdits

module.exports = passwordSchema;

const maxAge = 3 * 24 * 60 * 60 * 1000; // expiration token

//inscription user
module.exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username: req.body.username } });

  if (!passwordSchema.validate(req.body.password)) {
    const err = `Votre mot de passe doit avoir au moins 10 caractères, avec une majuscule, une minuscule et un chiffre au moins.`;
    return res.status(200).send({ err });
  }

  try {
    const user = bcrypt.hash(req.body.password, 10, function (_err, hash) {
      User.create({
        username: req.body.username,
        password: hash,
        isAdmin: 0,
      });
    });

    const message = `L'utilisateur ${req.body.username} a été crée avec succès`;
    res.status(200).json({ message });
  } catch (err) {
    const message = "L'utilisateur existe déja!";
    return res.status(400).json(message);
  }

  // User.findOne({ where: { username: req.body.username } })
  //   .then((user) => {
  //     if (!user) {
  //       if (!passwordSchema.validate(req.body.password)) {
  //         const err = `Votre mot de passe doit avoir au moins 10 caractères, avec une majuscule, une minuscule et un chiffre au moins.`;
  //         return res.status(200).send({ err });
  //       }

  //       bcrypt.hash(req.body.password, 10, function (_err, hash) {
  //         User.create(user)({
  //           username: req.body.username,
  //           password: hash,
  //           isAdmin: 0,
  //         })
  //           .then(() => {
  //             const message = `L'utilisateur ${req.body.username} a été crée avec succès`;
  //             res.status(200).json({ message });
  //           })
  //           .catch((err) => {
  //             const errors = signUpErrors(err);
  //             res.status(200).send({ err: errors });
  //           });
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     const message = `L'utilisateur n'a pas pu être crée. Réessayer dans quelques instants`;
  //     res.status(500).json({ message, data: error });
  //   });
};

//login user
module.exports.signIn = (req, res) => {
  User.findOne({
    where: { username: req.body.username },
  })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas.`;
        return res.status(404).json({ message });
      }
      console.log(User);

      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrect`;
            return res.status(401).json({ message, data: user });
          }

          //JWT
          const token = jwt.sign(
            { userId: user.id },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          );

          const message = `L'utilisateur a été connecté avec succès`;
          res.cookie(
            "jwt",
            // user.id,
            token,

            { httpOnly: true, maxAge }
          );

          res.json({ message, data: user, token });
        });
    })
    .catch((error) => {
      console.log(error);
      const message = `L'utilisateur n'a pas pu être connecté`;
      return res.json({ message, data: error });
    });
};

//logout user
module.exports.logout = (_req, res) => {
  const cookie = "";
  // res.cookie("jwt", " ", { maxAge: 1 });
  res.status(200).json({ cookie });
  res.redirect("/");
};
