const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getUserId: function (authorization) {
    let userId = -1; // user par défaut
    let token = module.exports.parseAuthorization(authorization);

    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, process.env.TOKEN_SECRET); // vérification si token valide
        if (jwtToken != null) userId = jwtToken.userId; // récupération de userId
      } catch (err) {}
    }
    return userId;
  },
  getAdmin: function (authorization) {
    let isAdmin = -1;
    let token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (jwtToken != null) isAdmin = jwtToken.isAdmin;
      } catch (err) {}
    }
    return isAdmin;
  },
};
