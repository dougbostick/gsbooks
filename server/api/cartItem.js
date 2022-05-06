const router = require("express").Router();
const {
  models: { Product, CartItem, User },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    console.log("req.body/api/cartitem", req.body);
    console.log(req.headers.authorization);
    const user = await User.findByToken(req.headers.authorization);
    console.log("no user", user);
    const duplicate = await CartItem.findOne({
      where: {
        productId: req.body.product.id,
        userId: user.id,
      },
    });
    if (duplicate) {
      duplicate.quantity += Number(req.body.quantity);
      await duplicate.save();
      //await duplicate.update({ quantity: duplicate.quantity+1 });
      res.send(duplicate);
    } else {
      const book = await CartItem.create({
        productId: req.body.product.id,
        userId: user.id,
        quantity: req.body.quantity,
        price: parseInt(req.body.product.price),
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

    res.send(
      await CartItem.findAll({
        where: {
          userId: user.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    await cartItem.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cartItem = await CartItem.findByPk(req.params.id);
    res.send(await cartItem.update(req.body));
  } catch (err) {
    next(err);
  }
});
