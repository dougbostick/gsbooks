//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
//temporarily commenting out for simplicity -ER
//const CartItem = require("./models/CartItem");
//const Cart = require("./models/Cart");

//associations could go here!
/*
**temp commenting out for simplicity -ER
CartItem.belongsTo(Product);
CartItem.belongsTo(Cart);
Cart.belongsTo(User);
*/

module.exports = {
  db,
  models: {
    User,
    Product
  },
};
