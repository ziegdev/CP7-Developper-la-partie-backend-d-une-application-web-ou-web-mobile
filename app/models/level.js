const CoreModel = require('./coreModel');

class Level extends CoreModel {
  name;

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

};

// on exporte la class directement !
module.exports = Level;