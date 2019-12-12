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
  console.log(results);
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

let newLevel = new Level({});

newLevel.setName("Extrême");
newLevel.setStatus(1);

newLevel.insert( (err, res) => {
  console.log(err, res);
});