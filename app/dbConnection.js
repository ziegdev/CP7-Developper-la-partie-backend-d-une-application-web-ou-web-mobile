const pg = require('pg');

class DBConnection {
  pg_client;

  constructor() {
    this.pg_client = new pg.Client(process.env.PGSQL_URL);
    this.pg_client.connect();
  };

  makeQuery(query, callback) {
    this.pg_client.query(query, callback);
  };

};

// on exporte une instance de la classe ! 
// ainsi, require récupèrera toujours le même objet, et on évite de multiplier les connexions à la DB.

module.exports = new DBConnection();