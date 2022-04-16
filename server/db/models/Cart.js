const Sequelize = require("sequelize");
const db = require("../db");

//will have user and line item associations
const Cart = db.define("cart", {});

module.exports = Cart;
