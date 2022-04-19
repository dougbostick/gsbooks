//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");
const Cart = require("./models/Cart");

//associations could go here!

CartItem.belongsTo(Product);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem)
Cart.belongsTo(User);
User.hasOne(Cart);


module.exports = {
  db,
  models: {
    User,
    Product
  },
};
