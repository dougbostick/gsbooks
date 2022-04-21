const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

//do we need this if we have line 14? -GS
router.get('/', async (req, res, next) => {
  try {
    res.json(await Product.findAll());
  } catch (err) {
    next(err)
  }
})

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log("/api/produtcs", products);
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});


//Admin Routes

// ---POST ROUTE TO CREATE PRODUCT
router.post('/', async(req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  }
  catch(err) {
    next(err);
  }
});

// ---POST ROUTE TO DELETE PRODUCT
router.delete('/:id', async(req, res, next)=>{
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

// ---POST ROUTE TO UPDATE PRODUCT
router.put('/:id', async(req,res,next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        res.send(await product.update(req.body));
    } catch(err) {
        next(err)
    }
})



