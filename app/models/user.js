const emailValidator = require('email-validator');
const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {

  getEmail() {
    return this.email;
  };

  setEmail(value) {
    // hop, on s'embete pas, on laisse le module faire le travail
    if (!emailValidator.validate(value)) {
      throw Error('User.email must be a valid email');
    } else {
      this.email = value;
    }
  };

  getPassword() {
    return this.password;
  };

  setPassword(value) {
    if (typeof value !== "string") {
      throw Error('User.password must be a string');
    } else {
      this.password = value;
    }
  };

  getFirstName() {
    return this.firstname;
  };

  setFirstName(value) {
    if(typeof value !== "string") {
      throw Error('User.firstname must be a string');
    } else {
      this.firstname = value;
    }
  };

  getLastName() {
    return this.lastname;
  };

  setLastName(value) {
    if (typeof value !== "string") {
      throw Error('User.firstname must be a string');
    } else {
      this.lastname = value;
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


  // petite fonction utilitaire
  getFullName() {
    return this.firstname+' '+this.lastname;
  };

};

User.init({
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  status: Sequelize.INTEGER
},{
  sequelize,
  tableName: "app_user",
  createdAt: "created_at",
  updatedAt: "updated_at"
});


module.exports = User;