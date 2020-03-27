const Sequelize = require('sequelize');
const sequelize = require('../database');

class Tag extends Sequelize.Model {};

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