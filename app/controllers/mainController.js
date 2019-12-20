const Quizz = require('../models/quizz');

const mainController = {

  homePage: (req, res) => {
    Quizz.findAll().then( (quizzes) => {
      res.render('index', {quizzes});
    });
  }

};


module.exports = mainController;