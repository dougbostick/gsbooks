const router = require('express').Router()
const { models: { Author }} = require('../db')
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.findAll();
    res.send(authors);
  } catch (ex) {
    next(ex);
  }
});