const {Tag} = require('../models');

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