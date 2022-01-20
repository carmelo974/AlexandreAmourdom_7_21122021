module.exports.signUpErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("username"))
    errors.username = "Pseudo incorrect ou déjà pris";

  // if(req.body.username.length >= 13 || req.body.username.length <= 3 .includes("username"))
  // errors.username = "le pseudo doit comporter entre 4 et 12 caractères"

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500kp";

  return errors;
};
