// on charge les env vars
const dotenv = require('dotenv');
dotenv.config();

const Quizz = require('./app/models/quizz');
const User = require('./app/models/user');

User.findAll({
  include: ['quizzes']
}).then( (users) => {
  for( let user of users) {
    console.log(user.getFullName(), user.quizzes.length);
    
  }
});