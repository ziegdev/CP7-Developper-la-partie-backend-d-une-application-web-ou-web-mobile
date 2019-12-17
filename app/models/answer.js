const sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

class Answer extends sequelize.Model {

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

  getQuestionsId() {
    return this.questions_id;
  };

  setQuestionsId(value) {
    if (!Number.isInteger(value)) {
      throw Error('Answer.questions_id must be an integer');
    } else {
      this.questions_id = value;
    }
  };

};

Answer.init({
  description: sequelize.STRING,
  status: sequelize.INTEGER
},{
  sequelize: dbConnection,
  tableName: "answers",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Answer;