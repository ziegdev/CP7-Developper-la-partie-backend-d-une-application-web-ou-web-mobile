const sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

class Tag extends sequelize.Model {

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
  name: sequelize.STRING,
  status: sequelize.INTEGER
},{
  sequelize: dbConnection,
  tableName: "tags",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

// on exporte la class directement !
module.exports = Tag;