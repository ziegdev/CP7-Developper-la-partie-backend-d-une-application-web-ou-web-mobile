const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');
const quizzController = require('./controllers/quizzController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');

const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page "quizz"
router.get('/quizz/:id', quizzController.quizzPage);

// page "tags" ("sujets")
router.get('/tags', tagController.tagList);

// quizzes par tag
router.get('/quizzes/tag/:id', quizzController.listByTag);

// user signup/login
router.get('/signup', userController.signupPage);
router.get('/login', userController.loginPage);

router.post('/signup', userController.signupAction);
router.post('/login', userController.loginAction);

module.exports = router;