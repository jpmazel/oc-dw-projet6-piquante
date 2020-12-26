const jwt = require('jsonwebtoken');
//importation pour utilisation des variables d'environnements
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  try{
    //récupére le token dans le headers Authorization: Bearer token
    const token = req.headers.authorization.split(' ')[1];
    console.log("TOKEN");
    console.log(token);

    const decodedToken = jwt.verify(token, `${process.env.JWT_DECODEDTOKEN}`);
    console.log("decodedToken");
    console.log(decodedToken);

    //récupérer le userId qu'il y a à l'intérieur
    const userId = decodedToken.userId
    if(req.body.userId && req.body.userId !== userId ){
      throw "User ID non valable"
    } else{
      next();
    }

  } catch{
    res.status(401).json({error: error | "Requête non authentifiée" })
  }
};
