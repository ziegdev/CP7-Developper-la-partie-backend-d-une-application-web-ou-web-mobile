const CoreModel = require('./coreModel');

class Answer extends CoreModel {
  description;
  status;
  questions_id;

  // on surcharge le nom de la table !
  static tableName = "answers";

  constructor(obj) {
    super(obj);
    this.description = obj.description;
    this.status = obj.status;
    this.questions_id = obj;
  };

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

module.exports = Answer;