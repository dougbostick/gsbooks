const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;

/*
book1 --> 'book1' , $5
*/
