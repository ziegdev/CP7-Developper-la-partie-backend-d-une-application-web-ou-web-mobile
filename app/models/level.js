const CoreModel = require('./coreModel');

class Level extends CoreModel {
  name;
  status;

  getName() {
    return this.name;
  };

  setName(value) {
    if(typeof value !== "string") {
      throw Error('Level.name must be a string');
    } else {
      this.name = value;
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

// on exporte la class directement !
module.exports = Level;