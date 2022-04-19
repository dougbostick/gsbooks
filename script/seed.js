"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
    User.create({ username: "evelyn", password: "123", admin: true }),
    User.create({ username: "stefan", password: "123", admin: true }),
    User.create({ username: "gary", password: "123", admin: true }),
    User.create({ username: "doug", password: "123", admin: true }),
  ]);

  const products = await Promise.all([
    Product.create({ name: "Harry Potter and the Sorcerer's Stone", price: 19.99 }),
    Product.create({ name: "Pachinko", price: 17.99 }),
    Product.create({ name: "Left Hand of Darkness", price: 9.99 }),
    Product.create({ name: "The Bluest Eye", price: 15.99 }),
    Product.create({ name: "Dune", price: 9.99 }),
    Product.create({ name: "Do Androids Dream of Electric Sheep", price: 11.99 }),
    Product.create({ name: "For Whom The Bell Tolls", price: 10.99 }),
    Product.create({ name: "The Wind-Up Bird Chronicle", price: 15.99 }),
    Product.create({ name: "One Hundred Years of Solitude", price: 15.99 }),
    Product.create({ name: "1984", price: 8.99 })
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
