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

// une question a plusieurs answers
Question.hasMany(Answer,{
  foreignKey: "questions_id",
  as: "answers"
});

// réciproque : une answer est lié à une seule question
Answer.belongsTo(Question,{
  foreignKey: "questions_id",
  as: "question"
});

// ATTENTION cas particulier : Question et Answer sont liés de 2 manières différentes!
// en effet, il y a aussi "la bonne réponse" !
Question.belongsTo(Answer,{
  foreignKey: "answers_id",
  as:"good_answer"
});


// une question a un niveau
Question.belongsTo(Level,{
  foreignKey: "levels_id",
  as: "level"
});
// réciproque : un niveau concerne plusieurs questions
Level.hasMany(Question, {
  foreignKey: "levels_id",
  as: "questions"
});


// on exporte la class directement !
module.exports = Question;