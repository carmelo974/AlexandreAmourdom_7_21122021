const User = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);
const multer = require("multer");

module.exports.uploadProfil =  (req, res) => {

  // try {
  //   if (
  //     req.file.detectedMimeType != "image/jpg" &&
  //     req.file.detectedMimeType != "image/png" &&
  //     req.file.detectedMimeType != "image/jpeg"
  //   )
  //     throw Error("invalid file");

  //   if (req.file.size > 500000) throw Error("max size");
  // } catch (err) {
  // //  const errors = uploadErrors(err);
  //   return res.status(201).json();
  // }
  // // const fileName = req.body.name + ".jpg";

  // await pipeline(
  //   req.file.stream,
  //   fs.createWriteStream(
  //     `${__dirname}/./client/public/uploads/profil/`
  //   )
  // );

  // const id = req.params.id;

  // const userImage = {
  //   image: '',
  // };

  // if (req.file) {
  //   userImage.image = `./uploads/profil/${req.file.filename}`;
  // }

  // return User.findByPk(id)
  //   .then((user) => {
  //     user.image = userImage.image;
  //     user
  //       .save()
  //       .then(() => res.status(200).json({ msg: 'image updated' }))
  //       .catch((err) => res.status(400).json({ err: err.message }));
  //   })
  //   .catch((err) => res.status(500).json({ err: err.message }));
}
