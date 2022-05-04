"use strict";

const faker = require('@faker-js/faker');
const {
  db,
  models: { User, Product, Category },
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
    User.create({ username: "cody", email: "cody@fullstack.com", password: "123", firstName: "Cody", lastName: "Banks", address: "123 Main Street" }),
    User.create({ username: "murphy", email: "murphy@fullstack.com", password: "123", firstName: "Murphy", lastName: "Murph", address: "123 Main Street"  }),
    User.create({ username: "evelyn", email: "evelyn@fullstack.com", password: "123", admin: true, firstName: "Evelyn", lastName: "Rodriguez", address: "123 Main Street"  }),
    User.create({ username: "stefan", email: "stefan@fullstack.com", password: "123", admin: true, firstName: "Stefan", lastName: "Mitrovic", address: "123 Main Street"  }),
    User.create({ username: "gary", email: "gary@fullstack.com", password: "123", admin: true, firstName: "Gary", lastName: "Smith", address: "123 Main Street"  }),
    User.create({ username: "doug", email: "doug@fullstack.com", password: "123", admin: true, firstName: "Doug", lastName: "Bostick", address: "123 Main Street"  }),
  ]);

  //  await Promise.all(
  //    Array(100).fill().map( (user) => {
  //      User.create({ username: faker.name.firstName(), password: "123"})
  //    })
  //  )
  const [ scienceFiction, generalFiction, worldLit, fantasy, historicalFiction, childrensLit, sciAndComp, biography ] = await Promise.all([
    Category.create({ name: 'Science Fiction' }),
    Category.create({ name: 'General Fiction' }),
    Category.create({ name: 'World Literature' }),
    Category.create({ name: 'Fantasy' }),
    Category.create({ name: 'Historical Fiction' }),
    Category.create({ name: 'Childrens Literature' }),
    Category.create({ name: 'Science, Math and Computing' }),
    Category.create({ name: 'Biography' }),
    ]);

  const products = await Promise.all([
    Product.create({ name: "Harry Potter and the Sorcerer's Stone", price: 19.99, author: "J.K. Rowling", categoryId: childrensLit.id}),
    Product.create({ name: "Pachinko", price: 17.99, author: "Min Jin Lee", categoryId: historicalFiction.id }),
    Product.create({ name: "Left Hand of Darkness", price: 9.99, author: "Ursula K. Le Guin", categoryId: scienceFiction.id }),
    Product.create({ name: "The Bluest Eye", price: 15.99, author: "Toni Morrison", categoryId: generalFiction.id }),
    Product.create({ name: "Dune", price: 9.99, author: "Frank Herbert", categoryId: scienceFiction.id }),
    Product.create({ name: "Do Androids Dream of Electric Sheep", price: 11.99, author: "Philip K. Dick", categoryId: scienceFiction.id }),
    Product.create({ name: "For Whom The Bell Tolls", price: 10.99, author: "Ernest Hemingway", categoryId: generalFiction.id }),
    Product.create({ name: "The Wind-Up Bird Chronicle", price: 15.99, author: "Haruki Murakami", categoryId: worldLit.id }),
    Product.create({ name: "Hard Boiled Wonderland and the End of the World", price: 15.99, author: "Haruki Murakami", categoryId: fantasy.id }),
    Product.create({ name: "One Hundred Years of Solitude", price: 15.99, author: "Gabriel Garcia Marquez", categoryId: worldLit.id }),
    Product.create({ name: "1984", price: 8.99, author: "George Orwell", categoryId: scienceFiction.id }),
    Product.create({ name: "Eloquent Javascript", price: 8.99, author: "Marjin Haverbeke", categoryId: sciAndComp.id }),
    Product.create({ name: "Learning Python", price: 8.99, author: "Mark Lutz", categoryId: sciAndComp.id }),
    Product.create({ name: "Cosmos", price: 8.99, author: "Carl Sagan", categoryId: sciAndComp.id }),
    Product.create({ name: "Contact", price: 8.99, author: "Carl Sagan", categoryId: scienceFiction.id }),
    Product.create({ name: "Educated", price: 8.99, author: "Tara Westover", categoryId: biography.id }),
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
