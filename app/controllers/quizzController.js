const Quizz = require('../models/quizz');
const Tag = require('../models/tag');

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
  },

  listByTag: (req, res) => {
    // plutot que de faire une requete compliquée
    // on va passer par le tag, et laisser les relations de Sequelize faire le taf !
    const tagId = parseInt(req.params.id);
    Tag.findByPk(tagId,{
      include: [{
        association: 'quizzes',
        include: ['author']
      }]
    }).then( (tag) => {
      res.render('index', {
        quizzes: tag.quizzes
      });
    });
  }

};

module.exports = quizzController;