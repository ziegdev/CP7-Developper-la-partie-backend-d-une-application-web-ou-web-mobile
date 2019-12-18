/**
 * On remplace le connecteur à la main pr une instance de sequelize
 * il faudra passer cette instance à chacun de nos modèles pour pouvoir les initialiser
 * 
 */

const sequelize = require('sequelize');

const dbConnection = new sequelize.Sequelize(process.env.PGSQL_URL);

module.exports = dbConnection;