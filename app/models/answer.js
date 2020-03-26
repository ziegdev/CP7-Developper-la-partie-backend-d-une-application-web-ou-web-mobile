const Sequelize = require('sequelize');
const sequelize = require('../database');

class Answer extends Sequelize.Model {

  getDescription() {
    return this.description;
  };

  setDescription(value) {
    if( typeof value !== "string") {
      throw Error('Answer.description must be a string');
    } else {
      this.description = value;
    }
  };

  getStatus() {
    return this.status;
  };

  setStatus(value) {
    if (!Number.isInteger(value)) {
      throw Error('Level.status must be an integer');
    } else {
      this.status = value;
    }
  };

  getQuestionId() {
    return this.question_id;
  };

  setQuestionId(value) {
    if (!Number.isInteger(value)) {
      throw Error('Answer.questions_id must be an integer');
    } else {
      this.question_id = value;
    }
  };

};

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