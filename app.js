//importation des paquets
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("./db/db");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

//déclaration des variables
const app = express();

//logger des requêtes et des réponses.
app.use(morgan("dev"));

//pour les problèmes de CORS Cross-Origin Request Sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//transformer le corps (le body)en json objet javascript utilisable
app.use(bodyParser.json());

//protection injection sql
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

//pour l'accés aux images
app.use("/images", express.static(path.join(__dirname, "images")));

//l'authentification
app.use("/api/auth", userRoutes);

//les sauces
app.use("/api/sauces", sauceRoutes);

//Exporter la constante app (application express) pour pouvoir l'utiliser depuis d'autre fichier (pour le serveur node)
module.exports = app;
