//importation des paquets
const express = require ('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./db/db');

const userRoutes = require("./routes/user");

//déclaration des variables
const app = express();

//les app
//logger
app.use(morgan("dev"));

//pour les problèmes de CORS-middleware générale-pas de route
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//transformer le corps (le body) javascript en objet utilisable
app.use(bodyParser.json());

//l'authentification
app.use("/api/auth", userRoutes);

//Exporter l'application
module.exports = app;