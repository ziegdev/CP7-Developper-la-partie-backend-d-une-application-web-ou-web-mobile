const Quizz = require('../models/quizz');

const quizzController = {

  quizzPage: (req, res) => {
    const quizzId = parseInt(req.params.id);
    Quizz.findByPk(quizzId,{
      include: [
        { association: 'author'},
        { association: 'questions', include: ['answers']}
      ]
    }).then( (quizz) => {
      res.render('quizz', {quizz});
    });
  }

};

module.exports = quizzController;