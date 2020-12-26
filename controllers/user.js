const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
//importation pour utilisation des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error
} 
console.log(result.parsed);


//SIGNUP pour enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  console.log("--------------------req.body.password------------------------------");
  console.log(req.body.password);
  const emailCryptoJs =  cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`).toString();
  console.log("------------------emailCryptoJs----------------");
  console.log(emailCryptoJs);
  
  //hasher le mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCryptoJs,
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


//LOGIN pour controler la validité de l'utilisateur
exports.login = (req, res, next) => {
  const emailCryptoJs =  cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`).toString();
  //chiff2@test.com  - HmacSHA256 5e19b69c1ec96ce39c7bd7e8b425fdd9ba9a29eb3e551e8bb8108dda8b54f721
  //                              5e19b69c1ec96ce39c7bd7e8b425fdd9ba9a29eb3e551e8bb8108dda8b54f721
  //chiff3@test.com  - HmacSHA256 733b04fed6c2775a057f5dd2028ed70b8453c617bbe273a05938471451358a57
  //                   HmacSHA512 fd6a68cf7429671ffcf7a24d3aad1bfd23433c899e9662bf1e77bbb7742ae3de56c35a52bd74766092eb6aeb2ee52c848663386cefd5101060e0632decb51dd7

  //azerTYUI12

  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur inexistant" });
      }
      //le user existe on utilise bcrypt pour comparer le mot de passe envoyé par l'utilisateur
      //avec le hash qui est enregistré avec le user de la base de donnée
      bcrypt
        .compare(req.body.password, user.password) //fonction asynchrone retourne une promésse
        .then((valid) => {
          if (!valid) {
            //reçoit un booleean true ou false
            return res.status(401).json({ error: "mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(//3 arguments
              {userId: user._id},
              `${process.env.JWT_DECODEDTOKEN}`,
              {expiresIn: '24h'}
              )            
          });
        })
        .catch((error) => res.status(500).json({ error })); //erreur serveur
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};
