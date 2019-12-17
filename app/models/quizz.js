const sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

const User = require('./user');
const Question = require('./question');
const Tag = require('./tag');

class Quizz extends sequelize.Model {

  getTitle() {
    return this.title;
  };

  setTitle(value) {
    if(typeof value !== "string") {
      throw Error('Quizz.title must ba a string');
    } else {
      this.title = value;
    }
  };


  getDescription() {
    return this.description;
  };

  setDescription(value) {
    if(typeof value !== "string") {
      throw Error('Quizz.description must ba a string');
    } else {
      this.description = value;
    }
  };


  getStatus() {
    return this.status;
  };

  setStatus(value) {
    if (!Number.isInteger(value)) {
      throw Error('Quizz.status must be an integer');
    } else {
      this.status = value;
    }
  };


  // getAppUserId() {
  //   return this.app_users_id;
  // };

  // setAppUserId(value) {
  //   if (! Number.isInteger(value)) {
  //     throw Error('Quizz.app_users_id must be an integer');
  //   } else {
  //     this.app_users_id = value;
  //   }
  // };
};

Quizz.init({
  title: sequelize.STRING,
  description: sequelize.STRING,
  status: sequelize.INTEGER
},{
  sequelize: dbConnection,
  tableName: "quizzes",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

/**
 * Associations (=relations)
 */

// User
Quizz.belongsTo(User,{
  foreignKey: "app_users_id",
  as: "author"
});

// ...et la réciproque.
User.hasMany(Quizz,{
  foreignKey:"app_users_id",
  as: "quizzes"
});


// Question
Quizz.hasMany(Question, {
  foreignKey: "quizzes_id",
  as: "questions"
});
// et la réciproque
Question.belongsTo(Quizz,{
  foreignKey: "quizzes_id",
  as: "quizz"
});


// tags, via la table de liaison
Quizz.belongsToMany(Tag,{
  as: "tags",
  through: 'quizzes_has_tags',
  foreignKey: 'quizzes_id',
  otherKey: 'tags_id',
  timestamps: false
});
Tag.belongsToMany(Quizz,{
  as: "quizzes",
  through: 'quizzes_has_tags',
  otherKey: 'quizzes_id',
  foreignKey: 'tags_id',
  timestamps: false
});

module.exports = Quizz;