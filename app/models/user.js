const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {

  getFullName() {
    return this.firstname + ' ' + this.lastname;
  };

};

User.init({
  email: Sequelize.STRING,
  role: Sequelize.STRING,
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, {
  sequelize,
  tableName: "app_user",
  createdAt: "created_at",
  updatedAt: "updated_at"
});


module.exports = User;