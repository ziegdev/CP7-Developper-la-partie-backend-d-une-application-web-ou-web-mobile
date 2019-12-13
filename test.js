// on charge les env vars
const dotenv = require('dotenv');
dotenv.config();

const Level = require('./app/models/level');

/**
 * Level.findAll
 */

/* Première version, non statique */
// const test = new Level({});
// test.findAll( (err, results) => {
//   console.log(results.rows);
// });


/* Deuxième version, rendue statique */
Level.findAll( (err, results) => {
  console.log(err, results);
});


/**
 * Level.findById
 */

// Level.findById(1, (err, result) => {
//   console.log(err, result);
// });


/**
 * Level.insert
 */

// let newLevel = new Level({});

// newLevel.setName("Extrême");
// newLevel.setStatus(1);

// newLevel.insert( (err, res) => {
//   console.log(err, res);
// });


/**
 * Level.update
 */

 //1. récupérer le "level"
// Level.findById(6, (err, level) => {
//   //2. modifier ses données
//   level.setName("Vraiment très dur");

//   //3. lancer la sauvegarde !
//   level.update( (err, res) => {
//     console.log(err, res);
//   });

// });

/**
 * Level.delete
 */

// //1. récupérer un "level"
// Level.findById(4, (err, level) => {
//   //2. le supprimer !
//   level.delete( console.log );
// });