const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await Product.findAll());
  } catch (err) {
    next(err)
  }
})

/*
---POST ROUTE TO CREATE PRODUCT
router.post('/products', async(req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  }
  catch(err) {
    next(err);
  }
});
*/