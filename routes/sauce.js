//importation
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceControllers = require("../controllers/sauce");

//Route POST pour créer une sauce
router.post("/", auth, multer, sauceControllers.createSauce);

router.get("/",  auth, sauceControllers.getAllSauce);




//exportation
module.exports = router;