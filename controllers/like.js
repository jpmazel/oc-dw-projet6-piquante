//importation
const Sauce = require('../models/Sauce');


exports.likeSauce = (req, res, next) => {
  
  //contenu de la requête like dislike envoyé par le navigateur
  const sauceLikeObject = req.body;
  console.log("////////////////CONTENU sauceLikeObject");
  console.log(sauceLikeObject);  

  console.log(`userId : ${sauceLikeObject.userId}`);
  console.log(`like : ${sauceLikeObject.like}`);

  //sélection de la sauce (permet l'affichage des likes dislikes sur le front)
  console.log("########CONTENU _id: req.params.id");
  console.log({ _id: req.params.id });

  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {      

      //like = +1 (like +1)
      if((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 1) ) {
        console.log("ok like +1");
        Sauce.updateOne({ _id: req.params.id }, { $inc: {likes : 1}, $push: { usersLiked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce +1 like" }))
        .catch((error) => {res.status(400).json({ error })});
      };      

      console.log("****CONTENU du then sauce");
      console.log(sauce);
      console.log("////////CONTENU sauce.usersLiked");
      console.log(sauce.usersLiked);
      console.log("////////CONTENU sauce.usersDisliked");
      console.log(sauce.usersDisliked);
      console.log("////////CONTENU req.body.userId");
      console.log(req.body.userId);   
      console.log("CONTENU req.body.like");
      console.log(req.body.like);   
      
      //like = 0 (neutre pour les sauces qui ont été liké)
      if((sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 0) ) {
        console.log("ok like = 0");
        Sauce.updateOne({_id: req.params.id}, { $inc: {likes: -1}, $pull: {usersLiked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce 0 like" }))
        .catch((error) => {res.status(400).json({ error })});
      }

     //like = -1 (dislike = +1)
     if((!sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == -1) ) {
      console.log("ok dislike +1");
      Sauce.updateOne({ _id: req.params.id }, { $inc: {dislikes : 1}, $push: { usersDisliked : req.body.userId}, _id: req.params.id})
      .then(() => res.status(201).json({ message: "sauce +1 dislike" }))
      .catch((error) => {res.status(400).json({ error })});
      };  

      //dislike = 0 (neutre pour les sauces qui ont été liké)
      if((sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == 0) ) {
        console.log("ok dislike = 0");
        Sauce.updateOne({_id: req.params.id}, { $inc: {dislikes: -1}, $pull: {usersDisliked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce 0 like" }))
        .catch((error) => {res.status(400).json({ error })});
      }     

  })  
  .catch((error) => res.status(404).json({error}));
};