const Sequelize = require('sequelize');
const sequelize = require('../database');

class Quizz extends Sequelize.Model {};


// Initialisation façon Sequelize (cf. Level pour plus de détails)
Quizz.init({
  title: Sequelize.STRING,
  description: Sequelize.STRING
},{
  sequelize,
  tableName: "quizz",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Quizz;