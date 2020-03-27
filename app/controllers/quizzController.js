const {Quizz, Tag} = require('../models');

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
      if (req.session.user) {
        res.render('play_quizz', {quizz});
      } else {
        res.render('quizz', {quizz});
      }
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
  },

  playQuizz: async (req, res) => { 
    console.log(req.body);
    try {
      const quizzId = parseInt(req.params.id);
      const quizz = await Quizz.findByPk(quizzId, {
        include: [
          { association: 'author'},
          { association: 'questions', include: ['answers', 'level', 'good_answer']},
          { association: 'tags'}
        ]
      });
      // une variable pour compter les points !
      let points = 0;
      // pour chaque question,...
      for (let question of quizz.questions) {
        //  on vérifie si on a un input qui correspond (sinon l'utilisateur n'a pas répondu)
        let inputName = "question_"+question.id;
        if (req.body[inputName]) {
          // ensuite on vérifie si c'est la bonne réponse
          if(req.body[inputName] == question.good_answer.id) {
            points ++; // hop, un point de plus !
          }
        }
      }

      res.render('quizz_results',{
        quizz,
        points,
        user_answers: req.body
      });
      
    } catch (error) {
      res.status(500).send(error);
    }
  }

};

module.exports = quizzController;