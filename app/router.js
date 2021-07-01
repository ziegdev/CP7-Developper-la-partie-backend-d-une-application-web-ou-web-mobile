const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

// importer les middlewares
const adminMiddleware = require('./middlewares/admin');

const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page "quizz"
router.get('/quiz/:id', quizController.quizzPage);
<<<<<<< HEAD
=======
router.post('/quiz/:id', quizController.playQuizz);
>>>>>>> bd6afe51187e3779d42d7c03ed9d14816d3b246b

// page "tags" ("sujets")
router.get('/tags', tagController.tagList);

// quizzes par tag
router.get('/quizzes/tag/:id', quizController.listByTag);

// user signup/login
router.get('/signup', userController.signupPage);
router.get('/login', userController.loginPage);

router.post('/signup', userController.signupAction);
router.post('/login', userController.loginAction);

router.get('/disconnect', userController.disconnect);

router.get('/profile', userController.profilePage);

// admin
router.get('/admin', adminMiddleware, adminController.adminPage);

module.exports = router;