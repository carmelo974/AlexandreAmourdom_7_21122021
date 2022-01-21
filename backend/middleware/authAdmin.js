module.exports = async (req, res, next) => {
  const userId = req.body.userId;
  const isAdmin = req.body.isAdmin;
  const author_userId = req.body.userId;

  if (userId === author_userId || isAdmin === true) {
    next();
  } else {
    resizeBy.send(401).json("Vous n'êtes pas autorisé");
  }
};
