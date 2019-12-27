const Quizz = require('../models/quizz');
const Tag = require('../models/tag');

const quizzController = {

  quizzPage: async (req, res) => {
    try {
      const quizzId = parseInt(req.params.id);
      const quizz = await Quizz.findByPk(quizzId,{
        include: [
          { association: 'author'},
          { association: 'questions', include: ['answers', 'level']},
          { association: 'tags'}
        ]
      });
      res.render('quizz', {quizz});
    } catch (err) {
      res.status(500).send(err);
    }
  },

  listByTag: async (req, res) => {
    // plutot que de faire une requete compliquée
    // on va passer par le tag, et laisser les relations de Sequelize faire le taf !
    try {
      const tagId = parseInt(req.params.id);
      const tag = await Tag.findByPk(tagId,{
        include: [{
          association: 'quizzes',
          include: ['author']
        }]
      });
      const quizzes = tag.quizzes;
      res.render('index', { quizzes });
    } catch (err) {
      res.status(500).send(err);
    }
  }

};

module.exports = quizzController;