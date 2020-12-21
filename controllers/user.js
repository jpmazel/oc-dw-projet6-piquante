const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');




//pour enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  //hasher le mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      //pour l'enregistrer dans la base de donnée
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé et sauvegardé" })
        )
        .catch((error) => res.status(400).json({ error }).send());
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};
