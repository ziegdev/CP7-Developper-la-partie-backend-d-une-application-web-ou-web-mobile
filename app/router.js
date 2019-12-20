const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');


const router = express.Router();

router.get('/', mainController.homePage);


module.exports = router;