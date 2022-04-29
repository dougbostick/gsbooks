const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }, 
  ISBN: {
    type: Sequelize.INTEGER
  },
  author:  {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  }
});

module.exports = Product;

