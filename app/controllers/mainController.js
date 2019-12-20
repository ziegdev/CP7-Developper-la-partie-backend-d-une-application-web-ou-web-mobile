const Quizz = require('../models/quizz');

const mainController = {

  homePage: (req, res) => {
    Quizz.findAll({
      include: ['author']
    }).then( (quizzes) => {
      res.render('index', {quizzes});
    });
  }

};


module.exports = mainController;