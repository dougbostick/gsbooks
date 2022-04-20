const router = require("express").Router();
const {
  models: { Product, CartItem, User },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    console.log("req.body /api/cartitem", req.body);
    const book = await CartItem.create({
      productId: req.body.id,
    });

    res.status(201).send(book);
  } catch (err) {
    next(err);
  }
});
