const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');
const quizzController = require('./controllers/quizzController');

const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page "quizz"
router.get('/quizz/:id', quizzController.quizzPage);


module.exports = router;