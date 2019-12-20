const Quizz = require('../models/quizz');

const quizzController = {

  quizzPage: (req, res) => {
    const quizzId = parseInt(req.params.id);
    Quizz.findByPk(quizzId,{
      include: [
        { association: 'author'},
        { association: 'questions', include: ['answers', 'level']},
        { association: 'tags'}
      ]
    }).then( (quizz) => {
      res.render('quizz', {quizz});
    });
  }

};

module.exports = quizzController;