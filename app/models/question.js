const sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

const Answer = require('./answer');
const Level = require('./level');

class Question extends sequelize.Model {

  getQuestion() {
    return this.question;
  };

  setQuestion(value) {
    if(typeof value !== "string") {
      throw Error('Question.question must be a string');
    } else {
      this.question = value;
    }
  };

  getAnecdote() {
    return this.anecdote;
  };

  setAnecdote(value) {
    if (typeof value !== "string") {
      throw Error('Question.anecdote must be a string');
    } else {
      this.anecdote = value;
    }
  };


  getWiki() {
    return this.wiki;
  };

  setWiki(value) {
    if (typeof value !== "string") {
      throw Error('Question.wiki must be a string');
    } else {
      this.wiki = value;
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

};


Question.init({
  question: sequelize.STRING,
  anecdote: sequelize.STRING,
  wiki: sequelize.STRING,
  status: sequelize.INTEGER
},{
  sequelize: dbConnection,
  tableName: "questions",
  createdAt: "created_at",
  updatedAt: "updated_at"
});


// les relations !!
Question.hasOne(Answer,{
  foreignKey: "questions_id",
  as: "answer"
});
Answer.belongsTo(Question,{
  foreignKey: "questions_id",
  as: "question"
});


Question.belongsTo(Level,{
  foreignKey: "levels_id",
  as: "level"
});
Level.hasMany(Question, {
  foreignKey: "levels_id",
  as: "questions"
});


// on exporte la class directement !
module.exports = Question;