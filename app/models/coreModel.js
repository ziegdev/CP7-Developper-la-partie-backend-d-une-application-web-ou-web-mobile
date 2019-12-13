// on récupère la connexion à la db
const DBConnection = require('../dbConnection');

class CoreModel {
  id;
  created_at;
  updated_at;

  static tableName = null;

  constructor(obj) {
    this.id = obj.id;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  };

  getId() {
    return this.id;
  };
  // pas de setId ?

  getCreatedAt() {
    return this.created_at;
  };

  setCreatedAt(value) {
    if (!Number.isInteger(value)) {
      throw Error('Model.created_at must be an integer');
    } else {
      this.created_at = value;
    }
  };

  getUpdatedAt() {
    return this.updated_at;
  };

  setUpdatedAt() {
    if (!Number.isInteger(value)) {
      throw Error('Model.updated_at must be an integer');
    } else {
      this.updated_at = value;
    }
  };



  /**
   * Méthode Active Record
   */

  static findAll(callback) {
    const query = `SELECT * FROM ${this.tableName}`;
    /* Version rapide, mais un peu trop !
     problème : on ne récupère pas des instances de User. */
    // DBConnection.makeQuery(query, callback);

    /* On améliore donc la méthode en bouclant pour instancier des Model */
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
        // on fait une boucle pour instancier des Model
        // on peut utiliser `new this` ! car on est dans une méthode statique, donc this représente la classe !
        let trueResult = [];
        for (let obj of results.rows) {
          trueResult.push(new this(obj));
        }
        // et on transmet les instances de Model au callback !
        callback(null, trueResult);
      }

    });
  };

  static findById(id, callback) {
    // Note : on s'embête pas avec les requêtes préparées (trop de travail dans DBConnection)
    // Mais c'est exceptionnel : c'est mal !
    const query = `SELECT * FROM ${this.tableName} WHERE id=${id}`;
    DBConnection.makeQuery(query, (err, result) => {
      // on refait les meme cas de figure...
      if (err) {
        return callback(err, null);
      }

      if (!result.rowCount) {
        return callback(null, []);
      } else {
        //... sauf qu'on fait pas de boucle : on prend que le premier résultat
        let trueResult = new this(result.rows[0]);
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

    /**
     * Note 2:  On ne connais pas à l'avance les propriétés de l'instance qui appellera cette fonction.
     * Mais grâce à Object.keys, on peut récupérer les nom des propriétés d'un objet !
     * On se sert de cette fonction pour créer la requête.
     */
    let properties = Object.keys(this);

    let tableStruct = [];
    let objetValues = [];

    for(let prop of properties) {
      // on filtre "id"
      if (prop !== 'id') {
        // au passage, on rajoute les ""
        tableStruct.push( `"${prop}"` );

        // Cas particulier : pour les timestamp, on utilise les valeurs automatiques
        if ( prop === 'created_at' || prop === 'updated_at' ) {
          objetValues.push( 'CURRENT_TIMESTAMP' );
        } else {
          objetValues.push( `'${this[prop]}'` );
        }
      }
    }

    // ensuite, on concatène le tout avec des virgules entre chaque mot
    tableStruct = tableStruct.join(',');
    objetValues.join(',');

    const query = `INSERT INTO "${this.constructor.tableName}" (${tableStruct}) VALUES (${objetValues}) RETURNING id`;

    //console.log(query);

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
    /**
     * Même reflexion que pour insert : impossible de connaitre les props à l'avance.
     * Ici encore, on se sert de Object.keys.
     */

    let query = `UPDATE "${this.constructor.tableName}" SET `;

    const properties = Object.keys(this);

    for (let prop of properties) {
      // on zappe id, et les timestamp
      if (prop !== 'id' && prop !== 'created_at' && prop !== 'updated_at') {
        query += `${prop} = '${this[prop]}' ,`;
      }
    }

    // pour updated_at, on utilise la valeur auto!
    query += `updated_at = CURRENT_TIMESTAMP WHERE id = ${this.getId()}`;
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
    const query = `DELETE FROM ${this.constructor.tableName} WHERE id=${this.getId()}`;
    DBConnection.makeQuery(query, callback);
    // TODO : better error handling
  };

};



module.exports = CoreModel;