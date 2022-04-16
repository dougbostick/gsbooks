const Sequelize = require("sequelize");
const db = require("../db");

//will add product.id association
const CartItem = db.define("cartitem", {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItem;

/*
book1 --> 'book1' , $5 x2
*/
