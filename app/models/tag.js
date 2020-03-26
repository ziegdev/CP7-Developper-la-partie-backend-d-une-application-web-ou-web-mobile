const Sequelize = require('sequelize');
const sequelize = require('../database');

class Tag extends Sequelize.Model {

  getName() {
    return this.name;
  };

  setName(value) {
    if(typeof value !== "string") {
      throw Error('Tag.name must be a string');
    } else {
      this.name = value;
    }
  };

  getStatus() {
    return this.status;
  };

  setStatus(value) {
    if (!Number.isInteger(value)) {
      throw Error('Tag.status must be an integer');
    } else {
      this.status = value;
    }
  };
};

Tag.init({
  name: Sequelize.STRING,
  status: Sequelize.INTEGER
},{
  sequelize,
  tableName: "tag",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

// on exporte la class directement !
module.exports = Tag;