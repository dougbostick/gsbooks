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


// ---POST ROUTE TO CREATE PRODUCT
router.post('/products', async(req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  }
  catch(err) {
    next(err);
  }
});


router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log("/api/produtcs", products);
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});


