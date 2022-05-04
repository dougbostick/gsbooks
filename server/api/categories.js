const router = require('express').Router()
const { models: { Category }} = require('../db')
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    console.log("/api/genres", categories);
    res.send(categories);
  } catch (ex) {
    next(ex);
  }
});