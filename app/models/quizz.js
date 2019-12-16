const sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

const User = require('./user');

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

// association !
Quizz.belongsTo(User,{
  foreignKey: "app_users_id",
  as: "author"
});

// Et la réciproque.
User.hasMany(Quizz,{
  foreignKey:"app_users_id",
  as: "quizzes"
});

module.exports = Quizz;