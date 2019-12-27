const Tag = require('../models/tag');

const tagController = {
  tagList: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.render('tags', {tags});
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

module.exports = tagController;