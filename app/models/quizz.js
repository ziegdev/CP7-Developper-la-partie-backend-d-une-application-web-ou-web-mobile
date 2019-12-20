const sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

/**
 * On importe les models dont on aura besoin pour les relations
 * ATTENTION : on défini les relations et leur réciproques ici, 
 * car on ne peut pas créer de dépendances cycliques !!!!
 */
const User = require('./user');
const Question = require('./question');
const Tag = require('./tag');

class Quizz extends sequelize.Model {

  getId() {
    return this.id;
  };

  getTitle() {
    return this.title;
  };

  setTitle(value) {
    if(typeof value !== "string") {
      throw Error('Quizz.title must ba a string');
    } else {
      this.title = value;
    }
  };


  getDescription() {
    return this.description;
  };

  setDescription(value) {
    if(typeof value !== "string") {
      throw Error('Quizz.description must ba a string');
    } else {
      this.description = value;
    }
  };


  getStatus() {
    return this.status;
  };

  setStatus(value) {
    if (!Number.isInteger(value)) {
      throw Error('Quizz.status must be an integer');
    } else {
      this.status = value;
    }
  };


  // getAppUserId() {
  //   return this.app_users_id;
  // };

  // setAppUserId(value) {
  //   if (! Number.isInteger(value)) {
  //     throw Error('Quizz.app_users_id must be an integer');
  //   } else {
  //     this.app_users_id = value;
  //   }
  // };
};


// Initialisation façon Sequelize (cf. Level pour plus de détails)
Quizz.init({
  title: sequelize.STRING,
  description: sequelize.STRING,
  status: sequelize.INTEGER
},{
  sequelize: dbConnection,
  tableName: "quizzes",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

/**
 * Associations (=relations)
 */

// User : "un Quizz appartient à un User"
Quizz.belongsTo(User,{
  foreignKey: "app_users_id",
  as: "author"
});

// ...et la réciproque : "un User possède plusieurs Quizz"
User.hasMany(Quizz,{
  foreignKey:"app_users_id",
  as: "quizzes"
});


// Question : "un Quizz possède plusieurs Questions"
Quizz.hasMany(Question, {
  foreignKey: "quizzes_id",
  as: "questions"
});
// et la réciproque: "une Question appartient à un seul Quizz"
Question.belongsTo(Quizz,{
  foreignKey: "quizzes_id",
  as: "quizz"
});


// Quizz <> Tags, via la table de liaison
// "Un Quizz possède plusieurs tags"
Quizz.belongsToMany(Tag,{
  as: "tags", // alias de l'association 
  through: 'quizzes_has_tags', // "via la table de liaison qui s'appelle ..."
  foreignKey: 'quizzes_id', // le nom de la clef de Quizz dans la table de liaison
  otherKey: 'tags_id', // le nom de la clef de "l'autre" (donc Tag)
  timestamps: false // on désactive les timestamps sur la table de liaison
});
// ... et la réciproque !
Tag.belongsToMany(Quizz,{
  as: "quizzes",
  through: 'quizzes_has_tags',
  otherKey: 'quizzes_id',
  foreignKey: 'tags_id',
  timestamps: false
});

module.exports = Quizz;