
class CoreModel {
  id;
  created_at;
  updated_at;

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

};



module.exports = CoreModel;