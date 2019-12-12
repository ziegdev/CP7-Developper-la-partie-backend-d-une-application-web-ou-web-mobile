const CoreModel = require('./coreModel');

class Answer extends CoreModel {
  description;
  questions_id;


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