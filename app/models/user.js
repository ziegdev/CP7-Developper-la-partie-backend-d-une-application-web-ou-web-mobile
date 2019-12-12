const emailValidator = require('email-validator');
const CoreModel = require('./coreModel');

class User extends CoreModel {
  email;
  password;
  firstname;
  lastname;
  status;

  constructor(obj) {
    super(obj);
    this.email = obj.email;
    this.password = obj.password;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.status = obj.status;
  };

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

};

module.exports = User;