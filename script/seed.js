"use strict";

//const faker = require("@faker-js/faker");
const {
  db,
  models: { User, Product, Category, Author },
} = require("../server/db");

const axios = require("axios");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const authors = await Promise.all([
    Author.create({
      name: "Haruki Murakami",
      bio: "some Japanese dude",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "J.K. Rowling",
      bio: "some English lady",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "George R.R. Martin",
      bio: "some American dude",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Min Jin Lee",
      bio: "some Korean lady",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Ursula K. LeGuin",
      bio: "some lady",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Frank Herbert",
      bio: "some dude",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Toni Morrison",
      bio: "some lady",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Philip K. Dick",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Ernest Hemingway",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Ernest Hemingway",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Gabriel Garcia Marquez",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "George Orwell",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Marjin Haverbeke",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Mark Lutz",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Carl Sagan",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "",
      bio: "Tara Westover",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Shel Silverstein",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Sheryl Sandberg",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Wendy Leigh",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Dan Harris",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Lindsay Hunter",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Lena Dunham",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Michael Cunningham",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Virginia Woolf",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Susan Cain",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Rose Levy Beranbaum",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Paula Hawkins",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Patrick Rothfuss",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Lawrence Wright",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Peter Hessler",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Leigh Bardugo",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Jeffrey Eugenides",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Taylor Jenkins Reid",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Isabel Wilkerson",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Michelle Alexander",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Gillian Flynn",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Miranda July",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Thomas Maier",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Augusten Burroughs",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Cormac McCarthy",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Kristin Hanna",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "James Clear",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Brit Bennett",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Roxane Gay",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Eddie Huang",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Emily X.R. Pan",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Akwaeke Emezi",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Nicola Yoon",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "John Boyne",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Rachel Bloom",
      bio: "some person",
      imageUrl: "placeholder",
    }),
  ]);
  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody@fullstack.com",
      password: "123",
      firstName: "Cody",
      lastName: "Banks",
      address: "123 Main Street",
    }),
    User.create({
      username: "murphy",
      email: "murphy@fullstack.com",
      password: "123",
      firstName: "Murphy",
      lastName: "Murph",
      address: "123 Main Street",
    }),
    User.create({
      username: "evelyn",
      email: "evelyn@fullstack.com",
      password: "123",
      admin: true,
      firstName: "Evelyn",
      lastName: "Rodriguez",
      address: "123 Main Street",
    }),
    User.create({
      username: "stefan",
      email: "stefan@fullstack.com",
      password: "123",
      admin: true,
      firstName: "Stefan",
      lastName: "Mitrovic",
      address: "123 Main Street",
    }),
    User.create({
      username: "gary",
      email: "gary@fullstack.com",
      password: "123",
      admin: true,
      firstName: "Gary",
      lastName: "Smith",
      address: "123 Main Street",
    }),
    User.create({
      username: "doug",
      email: "doug@fullstack.com",
      password: "123",
      admin: true,
      firstName: "Doug",
      lastName: "Bostick",
      address: "123 Main Street",
    }),
  ]);

  const [
    generalFiction,
    scienceFiction,
    worldLit,
    fantasy,
    historicalFiction,
    childrensLit,
    sciAndComp,
    biography,
    selfHelp,
    cooking,
    mysteryThrill,
    nonfiction,
    graphicNovelManga,
  ] = await Promise.all([
    Category.create({ name: "General Fiction" }),
    Category.create({ name: "Science Fiction" }),
    Category.create({ name: "World Literature" }),
    Category.create({ name: "Fantasy" }),
    Category.create({ name: "Historical Fiction" }),
    Category.create({ name: "Childrens Literature" }),
    Category.create({ name: "Science, Math and Computing" }),
    Category.create({ name: "Biography" }),
    Category.create({ name: "Self Help" }),
    Category.create({ name: "Cooking" }),
    Category.create({ name: "Mystery/ Thriller" }),
    Category.create({ name: "Nonfiction" }),
    Category.create({ name: "Graphic Novel/ Manga" }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Harry Potter and the Sorcerer's Stone",
      price: 19.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Pachinko",
      price: 17.99,
      author: "Min Jin Lee",
      categoryId: historicalFiction.id,
    }),
    Product.create({
      name: "Left Hand of Darkness",
      price: 9.99,
      author: "Ursula K. Le Guin",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "The Bluest Eye",
      price: 15.99,
      author: "Toni Morrison",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Dune",
      price: 9.99,
      author: "Frank Herbert",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "Do Androids Dream of Electric Sheep",
      price: 11.99,
      author: "Philip K. Dick",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "For Whom The Bell Tolls",
      price: 10.99,
      author: "Ernest Hemingway",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Wind-Up Bird Chronicle",
      price: 15.99,
      author: "Haruki Murakami",
      categoryId: worldLit.id,
    }),
    Product.create({
      name: "Hard Boiled Wonderland and the End of the World",
      price: 15.99,
      author: "Haruki Murakami",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "One Hundred Years of Solitude",
      price: 15.99,
      author: "Gabriel Garcia Marquez",
      categoryId: worldLit.id,
    }),
    Product.create({
      name: "1984",
      price: 8.99,
      author: "George Orwell",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "Eloquent Javascript",
      price: 8.99,
      author: "Marjin Haverbeke",
      categoryId: sciAndComp.id,
    }),
    Product.create({
      name: "Learning Python",
      price: 8.99,
      author: "Mark Lutz",
      categoryId: sciAndComp.id,
    }),
    Product.create({
      name: "Cosmos",
      price: 8.99,
      author: "Carl Sagan",
      categoryId: sciAndComp.id,
    }),
    Product.create({
      name: "Contact",
      price: 8.99,
      author: "Carl Sagan",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "Educated",
      price: 8.99,
      author: "Tara Westover",
      categoryId: biography.id,
    }),
    Product.create({
      name: "Falling Up",
      price: 14.99,
      author: "Shel Silverstein",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "A Light in the Attic",
      price: 11.99,
      author: "Shel Silverstein",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Lean In",
      price: 14.99,
      author: "Sheryl Sandberg",
      categoryId: selfHelp.id,
    }),
    Product.create({
      name: "Bowie",
      price: 13.99,
      author: "Wendy Leigh",
      categoryId: biography.id,
    }),
    Product.create({
      name: "10% Happier",
      price: 9.99,
      author: "Dan Harris",
      categoryId: selfHelp.id,
    }),
    Product.create({
      name: "Eat Only When You're Hungry",
      price: 12.99,
      author: "Lindsay Hunter",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Not That Kind of Girl",
      price: 16.99,
      author: "Lena Dunham",
      categoryId: biography.id,
    }),
    Product.create({
      name: "Attached.",
      price: 15.99,
      author: "Amir Levine M.D., Rachel S.F. Heller M.A.",
      categoryId: selfHelp.id,
    }),
    Product.create({
      name: "The Hours",
      price: 9.99,
      author: "Michael Cunningham",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "A Room of One's Own",
      price: 8.99,
      author: "Virginia Woolf",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Quiet",
      price: 12.99,
      author: "Susan Cain",
      categoryId: sciAndComp.id,
    }),
    Product.create({
      name: "The Baking Bible",
      price: 24.99,
      author: "Rose Levy Beranbaum",
      categoryId: cooking.id,
    }),
    Product.create({
      name: "The Girl on the Train",
      price: 13.99,
      author: "Paula Hawkins",
      categoryId: mysteryThrill.id,
    }),
    Product.create({
      name: "The Name of the Wind",
      price: 12.99,
      author: "Patrick Rothfuss",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "Going Clear Scientology, Hollywood, & the Prison of Belief",
      price: 15.99,
      author: "Lawrence Wright",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "The Buried",
      price: 16.99,
      author: "Peter Hessler",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "Six of Crows",
      price: 17.99,
      author: "Leigh Bardugo",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "Middlesex",
      price: 13.99,
      author: "Jeffrey Eugenides",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Daisy Jones & the Six",
      price: 18.99,
      author: "Taylor Jenkins Reid",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Warmth of Other Suns",
      price: 16.99,
      author: "Isabel Wilkerson",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "Caste",
      price: 15.99,
      author: "Isabel Wilkerson",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "The New Jim Crow",
      price: 11.99,
      author: "Michelle Alexander",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "Sharp Objects",
      price: 9.99,
      author: "Gillian Flynn",
      categoryId: mysteryThrill.id,
    }),
    Product.create({
      name: "The First Bad Man",
      price: 12.99,
      author: "Miranda July",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Masters of Sex",
      price: 13.99,
      author: "Thomas Maier",
      categoryId: biography.id,
    }),
    Product.create({
      name: "Lust & Wonder",
      price: 13.99,
      author: "Augusten Burroughs",
      categoryId: biography.id,
    }),
    Product.create({
      name: "The Road",
      price: 11.99,
      author: "Cormac McCarthy",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Four Winds",
      price: 16.99,
      author: "Kristin Hanna",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Atomic Habits",
      price: 17.99,
      author: "James Clear",
      categoryId: selfHelp.id,
    }),
    Product.create({
      name: "The Vanishing Half",
      price: 15.99,
      author: "Brit Bennett",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Girl Who Smiles Beads",
      price: 14.99,
      author: "Clemantine Wamariya and Elizabeth Weil",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Bad Feminist",
      price: 16.99,
      author: "Roxane Gray",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "Fresh Off the Boat",
      price: 12.99,
      author: "Eddie Huang",
      categoryId: biography.id,
    }),
    Product.create({
      name: "The Astonishing Color of After",
      price: 19.99,
      author: "Emily X.R. Pan",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Death of Vivek Oji",
      price: 14.99,
      author: "Akwaeke Emezi",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Freshwater",
      price: 14.99,
      author: "Akwaeke Emezi",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Sun is Also a Star",
      price: 20.99,
      author: "Nicola Yoon",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Heart's Invisible Furies",
      price: 21.99,
      author: "John Boyne",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "I Want to Be Where the Normal People Are",
      price: 13.99,
      author: "Rachel Bloom",
      categoryId: biography.id,
    }),
    Product.create({
      name: "Born to Run",
      price: 14.99,
      author: "Christopher McDougal",
      categoryId: biography.id,
    }),
    Product.create({
      name: "The Little Prince",
      price: 11.99,
      author: "Antoine De Saint Exupery",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "The Art of Fielding",
      price: 17.99,
      author: "Chad Harbach",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "A Brief History of Time",
      price: 15.99,
      author: "Stephen Hawking",
      categoryId: sciAndComp.id,
    }),
    Product.create({
      name: "Year of Yes",
      price: 18.99,
      author: "Shonda Rhimes",
      categoryId: biography.id,
    }),
    Product.create({
      name: "How to be a Person in the World",
      price: 12.99,
      author: "Heather Havrilesky",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "An American Marriage",
      price: 13.99,
      author: "Tayari Jones",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Elanor Oliphant is Comepletely Fine",
      price: 14.99,
      author: "Gail Honeyman",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Cook This Book",
      price: 21.99,
      author: "Molly Baz",
      categoryId: cooking.id,
    }),
    Product.create({
      name: "Dessert Person",
      price: 23.99,
      author: "Claire Saffitz",
      categoryId: cooking.id,
    }),
    Product.create({
      name: "Fun Home",
      price: 13.99,
      author: "Alison Bechdel",
      categoryId: graphicNovelManga.id,
    }),
    Product.create({
      name: "The Watchmen",
      price: 16.99,
      author: "Alan Moore",
      categoryId: graphicNovelManga.id,
    }),
    Product.create({
      name: "Maus 1: A Surivor's Tale: My Father Bleeds History",
      price: 14.99,
      author: "Art Spiegelman",
      categoryId: graphicNovelManga.id,
    }),
    Product.create({
      name: "Maus 2: A Surivor's Tale: Here My Troubles Began",
      price: 15.99,
      author: "Art Spiegelman",
      categoryId: graphicNovelManga.id,
    }),
    Product.create({
      name: "Death Note Complete Box Set: Volumes 1-13",
      price: 295.99,
      author: "Tsugumi Ohba",
      categoryId: graphicNovelManga.id,
    }),
    Product.create({
      name: "The Gifts of Imperfection",
      price: 14.99,
      author: "Brene Brown, Ph.D., L.M.S.W.",
      categoryId: selfHelp.id,
    }),
    Product.create({
      name: "The Mothers",
      price: 16.99,
      author: "Brit Bennett",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "A Short History of Nearly Everything",
      price: 13.99,
      author: "Bill Bryson",
      categoryId: nonfiction.id,
    }),
    Product.create({
      name: "The Nightingale",
      price: 17.99,
      author: "Kristin Hannah",
      categoryId: historicalFiction.id,
    }),
    Product.create({
      name: "The Great Alone",
      price: 18.99,
      author: "Kristin Hannah",
      categoryId: historicalFiction.id,
    }),
    Product.create({
      name: "Cat's Cradle",
      price: 15.99,
      author: "Kurt Vonnegut",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Breakfast of Champions",
      price: 16.99,
      author: "Kurt Vonnegut",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Slaughterhouse-Five",
      price: 18.99,
      author: "Kurt Vonnegut",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "A Little Life",
      price: 20.99,
      author: "Hanya Yanagihara",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "To Paradise",
      price: 19.99,
      author: "Hanya Yanagihara",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Clash of Kings",
      price: 18.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "A Game of Thrones",
      price: 17.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "A Storm of Swords",
      price: 19.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "A Feast for Crows",
      price: 16.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "A Dance with Dragons",
      price: 19.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
    }),
    Product.create({
      name: "Harry Potter and the Chamber of Secrets",
      price: 12.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Harry Potter and the Prisoner of Azkaban",
      price: 13.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Harry Potter and the Goblet of Fire",
      price: 15.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Harry Potter and the Order of the Phoenix",
      price: 16.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Harry Potter and the Deathly Gallows",
      price: 17.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Harry Potter and the Half Blood Prince",
      price: 15.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
    }),
    Product.create({
      name: "Beautiful World, Where Are You",
      price: 16.99,
      author: "Sally Rooney",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "Normal People",
      price: 15.99,
      author: "Sally Rooney",
      categoryId: generalFiction.id,
    }),
    Product.create({
      name: "The Book on Pie",
      price: 19.99,
      author: "Erin Jeanne McDowell",
      categoryId: cooking.id,
    }),
    Product.create({
      name: "Salt Fat Acid Heat",
      price: 16.99,
      author: "Samin Nosrat",
      categoryId: cooking.id,
    }),
    Product.create({
      name: "Final Girls",
      price: 14.99,
      author: "Riley Sager",
      categoryId: mysteryThrill.id,
    }),
    Product.create({
      name: "Recursion",
      price: 18.99,
      author: "Blake Crouch",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "Dark Matter",
      price: 17.99,
      author: "Blake Crouch",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "The Forever War",
      price: 11.99,
      author: "Joe Haldeman",
      categoryId: scienceFiction.id,
    }),
    Product.create({
      name: "Things Fall Apart",
      price: 10.99,
      author: "Chinua Achebe",
      categoryId: worldLit.id,
    }),
    Product.create({
      name: "The Kite Runner",
      price: 14.99,
      author: "Khaled Hosseini",
      categoryId: worldLit.id,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${authors.length} authors`);

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
