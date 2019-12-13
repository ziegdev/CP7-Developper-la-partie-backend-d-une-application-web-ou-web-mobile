// on récupère la connexion à la db
const DBConnection = require('../dbConnection');

const CoreModel = require('./coreModel');

class Level extends CoreModel {
  name;
  status;

  constructor(obj) {
    super(obj);
    this.name = obj.name;
    this.status = obj.status;
  };

  getName() {
    return this.name;
  };

  setName(value) {
    if(typeof value !== "string") {
      throw Error('Level.name must be a string');
    } else {
      this.name = value;
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


  static findAll(callback) {
    const query = "SELECT * FROM levels";
    /* Version rapide, mais un peu trop !
     problème : on ne récupère pas des instances de Level. */
    // DBConnection.makeQuery(query, callback);

    /* On améliore donc la méthode en bouclant pour instancier des Levels */
    DBConnection.makeQuery(query, (err, results) => {
      // 1er cas de figure: une erreur => on la passe au callback (return est là pour arrêter la fonction)
      if (err) {
        return callback(err, null);
      }

      // 2 ème cas de figure : résultat vide => on passe une liste vide au callback
      if (!results.rowCount) {
        return callback(null, []);
      } else {
        // 3 ème cas de figure : on a des résultats !
        // on fait une boucle pour instancier des Levels
        let trueResult = [];
        for (let obj of results.rows) {
          trueResult.push(new Level(obj));
        }
        // et on transmet les instances de Level au callback !
        callback(null, trueResult);
      }

    });
  };

  static findById(id, callback) {
    // Note : on s'embête pas avec les requêtes préparées (trop de travail dans DBConnection)
    // Mais c'est exceptionnel : c'est mal !
    const query = `SELECT * FROM levels WHERE id=${id}`;
    DBConnection.makeQuery(query, (err, result) => {
      // on refait les meme cas de figure...
      if (err) {
        return callback(err, null);
      }

      if (!result.rowCount) {
        return callback(null, []);
      } else {
        //... sauf qu'on fait pas de boucle : on prend que le premier résultat
        let trueResult = new Level(result.rows[0]);
        callback(null, trueResult);
      }
    });
  };

  insert(callback) {
    /**
     * Note:  en l'état, la méthode ne modifie que l'id de l'objet courant
     * on pourrait l'améliorer en rajoutant "returning created_at, updated_at"
     * et ainsi mettre à jour les timestamps
     * A FAIRE EN BONUS SI LE TEMPS LE PERMET
     */

    const query = `INSERT INTO "levels"("name", "status", "created_at", "updated_at") VALUES
    ('${this.name}', ${this.status}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )
    RETURNING id`;

    DBConnection.makeQuery(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      if (result.rowCount) {
        // grace à "RETURNING id", on peut récupérer l'id de l'objet nouvellement inséré
        // on a plus qu'à le mettre dans l'objet courant
        this.id = result.rows[0].id;
        // puis on appelle le callback en lui passant l'instance courante
        callback(null, this);

      } else {
        // si pas de retour, il s'est passé quelquechose de bizarre...
        callback('Insert did not return any id.', this);
      }
    });
  };


  update(callback) {
    const query = `UPDATE "levels" SET 
    name = '${this.getName()}',
    status = ${this.getStatus()},
    updated_at = CURRENT_TIMESTAMP
    WHERE id = ${this.getId()}`;
    DBConnection.makeQuery(query, (err, result) => {
      if (err) {
        callback(err, null);
      }

      if (result.rowCount) {
        // au moins une ligne a été modifié => tout va bien !
        callback(null, this);
      } else {
        callback('Update did not target any rows', this);
      }
    });
  };

  delete(callback) {
    const query = `DELETE FROM levels WHERE id=${this.getId()}`;
    DBConnection.makeQuery(query, callback);
    // TODO : better error handling
  };

};

// on exporte la class directement !
module.exports = Level;