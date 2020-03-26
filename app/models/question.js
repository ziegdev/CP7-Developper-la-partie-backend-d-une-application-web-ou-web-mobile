const Sequelize = require('sequelize');
const sequelize = require('../database');

const Answer = require('./answer');
const Level = require('./level');

class Question extends Sequelize.Model {

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
  question: Sequelize.STRING,
  anecdote: Sequelize.STRING,
  wiki: Sequelize.STRING,
  status: Sequelize.INTEGER
},{
  sequelize,
  tableName: "question",
  createdAt: "created_at",
  updatedAt: "updated_at"
});


// les relations !!

// une question a plusieurs answers
Question.hasMany(Answer,{
  foreignKey: "question_id",
  as: "answers"
});

// réciproque : une answer est lié à une seule question
Answer.belongsTo(Question,{
  foreignKey: "question_id",
  as: "question"
});

// ATTENTION cas particulier : Question et Answer sont liés de 2 manières différentes!
// en effet, il y a aussi "la bonne réponse" !
Question.belongsTo(Answer,{
  foreignKey: "answer_id",
  as:"good_answer"
});


// une question a un niveau
Question.belongsTo(Level,{
  foreignKey: "level_id",
  as: "level"
});
// réciproque : un niveau concerne plusieurs questions
Level.hasMany(Question, {
  foreignKey: "level_id",
  as: "question"
});


// on exporte la class directement !
module.exports = Question;