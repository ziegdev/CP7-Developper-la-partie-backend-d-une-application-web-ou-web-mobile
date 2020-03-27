const Sequelize = require('sequelize');
const sequelize = require('../database');

class Answer extends Sequelize.Model {};

Answer.init({
  description: Sequelize.STRING,
  status: Sequelize.INTEGER
},{
  sequelize,
  tableName: "answer",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Answer;