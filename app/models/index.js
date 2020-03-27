const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quizz = require('./quizz');
const Tag = require('./tag');
const User = require('./user');

// une question a plusieurs answers
Question.hasMany(Answer, {
    foreignKey: "question_id",
    as: "answers"
});

// réciproque : une answer est lié à une seule question
Answer.belongsTo(Question, {
    foreignKey: "question_id",
    as: "question"
});

// ATTENTION cas particulier : Question et Answer sont liés de 2 manières différentes!
// en effet, il y a aussi "la bonne réponse" !
Question.belongsTo(Answer, {
    foreignKey: "answer_id",
    as: "good_answer"
});


// une question a un niveau
Question.belongsTo(Level, {
    foreignKey: "level_id",
    as: "level"
});
// réciproque : un niveau concerne plusieurs questions
Level.hasMany(Question, {
    foreignKey: "level_id",
    as: "question"
});


// User : "un Quizz appartient à un User"
Quizz.belongsTo(User, {
    foreignKey: "app_user_id",
    as: "author"
});

// ...et la réciproque : "un User possède plusieurs Quizz"
User.hasMany(Quizz, {
    foreignKey: "app_user_id",
    as: "quizzes"
});


// Question : "un Quizz possède plusieurs Questions"
Quizz.hasMany(Question, {
    foreignKey: "quizz_id",
    as: "questions"
});
// et la réciproque: "une Question appartient à un seul Quizz"
Question.belongsTo(Quizz, {
    foreignKey: "quizz_id",
    as: "quizz"
});


// Quizz <> Tags, via la table de liaison
// "Un Quizz possède plusieurs tags"
Quizz.belongsToMany(Tag, {
    as: "tags", // alias de l'association 
    through: 'quizz_has_tag', // "via la table de liaison qui s'appelle ..."
    foreignKey: 'quizz_id', // le nom de la clef de Quizz dans la table de liaison
    otherKey: 'tag_id', // le nom de la clef de "l'autre" (donc Tag)
    timestamps: false // on désactive les timestamps sur la table de liaison
});
// ... et la réciproque !
Tag.belongsToMany(Quizz, {
    as: "quizzes",
    through: 'quizz_has_tag',
    otherKey: 'quizz_id',
    foreignKey: 'tag_id',
    timestamps: false
});

module.exports = { Answer, Level, Question, Quizz, Tag, User };