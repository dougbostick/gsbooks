const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  isbn: {
    type: Sequelize.TEXT,
  },
  thumbUrl: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  author: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
