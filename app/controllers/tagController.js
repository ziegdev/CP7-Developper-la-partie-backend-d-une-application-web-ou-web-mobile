const Tag = require('../models/tag');

const tagController = {
  tagList: (req, res) => {
    Tag.findAll().then( (tags) => {
      res.render('tags', {tags});
    });
  }
};

module.exports = tagController;