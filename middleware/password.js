const passwordSchema = require('../models/Password');

//Vérification de la qualité du password par rapport au schema
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
      return res.status(400).json({ error : "Le mot de passe n'est pas assez fort : " + passwordSchema.validate(req.body.password, { list: true }) });
  } else {
      next();
  }
}


