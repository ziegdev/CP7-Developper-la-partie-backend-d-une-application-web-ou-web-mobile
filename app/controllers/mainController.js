const {Quizz} = require('../models');

const mainController = {

  homePage: async (req, res) => {
    try {
      const quizzes = await Quizz.findAll({
        include: ['author']
      });
      res.render('index', {quizzes});
    } catch (err) {
      res.status(500).send(err);
    }
  }

};


module.exports = mainController;