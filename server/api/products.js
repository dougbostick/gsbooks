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

// ---PUT ROUTE TO UPDATE PRODUCT
router.put('/:id', async(req,res,next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        res.send(await product.update(req.body));
    } catch(err) {
        next(err)
    }
})

// ---PUT ROUTE TO UPDATE PRODUCT INVENTORY LEVEL
router.put('/inventory/:id', async(req,res,next) => {
    try {
        /* Issue here is having a put request that is different
        from the one above and placing the call in the relevant spot
        */
        const productInv = await Product.findByPk(req.params.id).inventoryLevel
        let product = await Product.findByPk(req.params.id)
        let newInv = productInv - req.body;
        console.log('product', product);
        res.send(await product.update({inventoryLevel: newInv}));
    } catch(err) {
        next(err)
    }
})



