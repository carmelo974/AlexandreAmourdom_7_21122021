const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid UserId';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(404).json({ error: new Error('Invalid Request') });
//   }
  //   // try {
  //   //     // récupération du token dans le header de la requête
  //   //     const token = req.headers.authorization.split(" ")[1];
  //   //     const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  //   //     // le userId correspond au userID dans le token
  //   //     const userId = decodedToken.userId;
  //   //     if (req.body.userId && req.body.userId !== userId) {
  //   //       throw "User ID non valable!";
  //   //     } else {
  //   //       next();
  //   //     }
  //   //   } catch (error) {
  //   //     res.status(401).json({ error: error | "Requête non authentifiée!" });
  //   //   }

  // const token = req.cookies.jwt;

  // if (token) {
  //   jwt.verify(token, process.env.TOKENKEY, async (err, decodedToken) => {
  //     if (err) {
  //       res.locals.user = null;
  //       res.cookie("jwt", "", { maxAge: 1 });
  //       next();
  //     } else {
  //       let user = await User.findOne(decodedToken.userId);
  //       res.locals.user = user;
  //       console.log("res locals" + res.locals.user);
  //       next();
  //     }
  //   });
  // } else {
  //   res.locals.user = null;
  //   next();
  // }
// };

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     //controle du token
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.send(200).json("no token");
//       } else {
//         console.log("decoded id " + decodedToken.userId);
//         next();
//       }
//     });
//   } else {
//     console.log("No token");
//   }
// };
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET, (error, decodedToken) => {
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
      return res.status(401).json({ message, data: error });
    }

    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      res.status(401).json({ message });
    } else {
      next();
    }
  });
};
