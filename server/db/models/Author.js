const Sequelize = require("sequelize");
const db = require("../db");

const Author = db.define("author", {
  name: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum lacinia quis vel eros donec ac. Viverra nibh cras pulvinar mattis nunc sed. Nullam vehicula ipsum a arcu cursus vitae congue. Nibh nisl condimentum id venenatis a condimentum vitae sapien. Integer feugiat scelerisque varius morbi enim nunc faucibus a. Ultrices eros in cursus turpis massa tincidunt dui ut. Maecenas accumsan lacus vel facilisis volutpat est velit."
  },
  imageUrl: {
    type: Sequelize.STRING, 
    defaultValue: "placeholderPerson.png"
  }
});

module.exports = Author;
