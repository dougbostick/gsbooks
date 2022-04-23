const router = require("express").Router();
const {
  models: { Product, CartItem, User },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    console.log("req.headers/api/cartitem", req.headers);
    const user = await User.findByToken(req.headers.authorization);
    const duplicate = await CartItem.findOne({
      where: {
        productId: req.body.cartItem,
        userId: user.id,
      },
    });
    if (duplicate) {
      duplicate.quantity++;
      await duplicate.save();
      //await duplicate.update({ quantity: duplicate.quantity+1 });
      res.send(duplicate);
    } else {
      const book = await CartItem.create({
        productId: req.body.cartItem,
        userId: user.id,
        quantity: 1,
      });
      res.status(201).send(book);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await CartItem.findAll());
  } catch (ex) {
    next(ex);
  }
});

//   where: {
//     userId: user.id,
//   },
