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
  imgUrl: {
    type: Sequelize.STRING,
  },
  thumbUrl: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;
