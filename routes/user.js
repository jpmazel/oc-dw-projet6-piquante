//importation
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");

// console.log("*******************CONTENU router :****************")
// console.log(router);


//les routes
router.post("/signup", userController.signup);
router.post("/login");


//exportation
module.exports = router;
