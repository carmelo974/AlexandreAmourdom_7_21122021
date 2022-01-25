module.exports = async (req, res, next) => {
  const userId = req.params.userId;
  const isAdmin = req.params.isAdmin;
  const author_userId = req.params.userId;
  console.log(author_userId);

  if (userId === author_userId || isAdmin === 1) {
    next();
  } else {
    res.send(401).json("Vous n'êtes pas autorisé");
  }
};
