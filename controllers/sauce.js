//importation
const Sauce = require('../models/Sauce');
const fs = require('fs'); // accéder au système de fichier


//logique métier
exports.createSauce = (req, res, next) => {

  console.log("---CONTENU Sauce------------------------------");
  console.log(Sauce);

  // console.log("contenu de req");
  // console.log(req);

  console.log("------CONTENU de req.body-------------------------");
  console.log(req.body);

  console.log("------------CONTENU de req.body.sauce");  
  console.log(req.body.sauce);

  const sauceObject = JSON.parse(req.body.sauce);

  console.log("-------CONTENU de sauceObject");  
  console.log(sauceObject);

  delete sauceObject._id;

  const sauce = new Sauce({    
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log("-----CONTENU de l'OBJET sauce  : ");
  console.log(sauce);

  //enregistrer l'objet dans la base de donné en appelant la méthode save
  sauce
    .save()
    .then(() =>
      res.status(201).json({
        message: "Objet enregistré dans la base de donnée",
        contenu: req.body,
      })
    )
    .catch((error) => res.status(400).json({ error })); //équivalent de {error : error}

};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body};
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //2 arguments l'objet et la nouvelle version de l'objet
    .then(() => res.status(200).json({ message: "objet mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
};



exports.getAllSauce = (req, res, next) => {
  //utilisation de la méthode finf() pour avoir la liste complète
  Sauce.find()
    .then((lesObjets) => res.status(200).json(lesObjets))
    .catch((error) => res.status(400).json({ error })); 
}

exports.getOneSauce = (req, res, next) => {
  //pour accéder à l'id   req.params.id
  console.log("------------------------_id: req.params.id");
  console.log({ _id: req.params.id });

  Sauce.findOne({ _id: req.params.id })
    .then((lObjet) => res.status(200).json(lObjet))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: `l'objet ${req.params.id} a été supprimé` }))
        .catch((error) => res.status(404).json({ error }));
    });
  })
  .catch(error => res.status(500).json({error}));  
};