const Sequelize = require("sequelize");
const db = require("../db");

const Author = db.define("author", {
  name: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.TEXT
  }, 
  imageUrl: {
    type: Sequelize.STRING,
    //defaultValue: "placeholder_img.png"
}
});

module.exports = Author;