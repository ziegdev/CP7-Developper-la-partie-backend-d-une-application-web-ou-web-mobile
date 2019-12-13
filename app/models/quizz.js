const CoreModel = require('./coreModel');

class Quizz extends CoreModel {
  title;
  description;
  status;
  app_users_id;

  // on surcharge le nom de la table !
  static tableName = "quizzes";

  constructor(obj) {
    super(obj);
    this.title = obj.title;
    this.description = obj.description;
    this.status = obj.status;
    this.app_users_id = obj.app_users_id;
  };

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


  getAppUserId() {
    return this.app_users_id;
  };

  setAppUserId(value) {
    if (! Number.isInteger(value)) {
      throw Error('Quizz.app_users_id must be an integer');
    } else {
      this.app_users_id = value;
    }
  };
};

module.exports = Quizz;