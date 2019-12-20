const Quizz = require('../models/quizz');

const quizzController = {

  quizzPage: (req, res) => {
    const quizzId = parseInt(req.params.id);
    Quizz.findByPk(quizzId).then( (quizz) => {
      res.render('quizz', {quizz});
    });
  }

};

module.exports = quizzController;