//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");
const Cart = require("./models/Cart");
const Category = require("./models/Category");
const Author = require("./models/Author");

//associations go here!

CartItem.belongsTo(Product);
CartItem.belongsTo(User);
Product.belongsTo(Category);
Author.hasMany(Product) /* ***do we need this??*** */

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    Cart,
    Category, 
    Author
  },
};
