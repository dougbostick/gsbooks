"use strict";

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
      bio: "A leading figure in postmodern literature, Haruki Murakami was born in Kyoto in 1949. His first novel, Hear the Wind Sing, won the Gunzou Literature prize for budding writers, which he followed with many other novels, including Kafka on the Shore; The Wind-Up Bird Chronicle; 1Q84; Hard-Boiled Wonderland and the End of the World; and Norwegian Wood, which saw a film adaptation released in Japan in 2010. In 2015, he was named one of the Time 100 most influential people. His work has been translated into more than fifty languages worldwide.",
      imageUrl: "auth-HarukiMurakami.jpeg"
    }),
    Author.create({
      name: "J.K. Rowling",
      bio: "The author of the celebrated Harry Potter series, J. K. Rowling is one of the world's most successful authors. Her books have created a fantastic world — filled with wizards and muggles — that has completely revitalized a love of reading in both kids and adults. In addition to books, the Harry Potter Series includes the play Harry Potter and the Cursed Child, which debuted on the London stage to a sold-out audience. Rowling has also published the novel A Casual Vacancy and several books in the Cormoran Strike series under the pen name Robert Galbraith.",
      imageUrl: "auth-JKRowling.jpeg"
    }),
    Author.create({
      name: "George R.R. Martin",
      bio: "An American author and screenwriter, George R. R. Martin is best known for his epic fantasy series A Song of Ice and Fire. The bestselling series, which began with A Game of Thrones, inspired the popular HBO television series of the same name. The series will conclude with the forthcoming books The Winds of Winter and A Dream of Spring. Other works set in or about Westeros include The World of Ice and Fire, and A Knight of the Seven Kingdoms. His science fiction novella Nightflyers has also been adapted as a television series; and he is the creator of the shared-world Wild Cards universe, working with the finest writers in the genre.",
      imageUrl: "auth-GRRM.jpeg"
    }),
    Author.create({
      name: "Min Jin Lee",
      bio: "Min Jin Lee is a recipient of fiction fellowships from the Guggenheim Foundation and the Radcliffe Institute of Advanced Study at Harvard. Her second novel Pachinko (2017) was a finalist for the National Book Award for Fiction, runner-up for the Dayton Literary Peace Prize, winner of the Medici Book Club Prize, and a New York Times 10 Best Books of 2017. A New York Times Bestseller, Pachinko was also a Top 10 Books of the Year for BBC, Canadian Broadcasting Corporation, and the New York Public Library. Pachinko was a selection for “Now Read This,” the joint book club of PBS NewsHour and The New York Times. It was on over 75 best books of the year lists, including NPR, PBS, and CNN. Pachinko will be translated into 25 languages. Lee’s debut novel Free Food for Millionaires (2007) was a Top 10 Books of the Year for The Times of London, NPR's Fresh Air, USA Today, and a national bestseller. Her writings have appeared in The New Yorker, NPR's Selected Shorts, One Story, The New York Review of Books, The New York Times Magazine, The New York Times Book Review, The Times Literary Supplement, The Guardian, Conde Nast Traveler, The Times of London, and Wall Street Journal. She served three consecutive seasons as a Morning Forum columnist of the Chosun Ilbo of South Korea. In 2018, Lee was named as an Adweek Creative 100 for being one of the “10 Writers and Editors Who are Changing the National Conversation” and a Frederick Douglass 200. She received an honorary degree of Doctor of Humane Letters from Monmouth College. She will be a Writer-in-Residence at Amherst College from 2019-2022.",
      imageUrl: "auth-MinJinLee.jpeg"
    }),
    Author.create({
      name: "Ursula K. LeGuin",
      bio: "Ursula Kroeber Le Guin is an American author of novels, children's books, and short stories, mainly in the genres of fantasy and science fiction. She has also written poetry and essays. First published in the 1960s, her work has often depicted futuristic or imaginary alternative worlds in politics, the natural environment, gender, religion, sexuality and ethnography. She has won the Hugo Award, Nebula Award, Locus Award, and World Fantasy Award, each more than once. In 2014, she was awarded the National Book Foundation Medal for Distinguished Contribution to American Letters. ",
      imageUrl: "auth-UrsulaLeguin.jpeg"
    }),
    Author.create({
      name: "Frank Herbert",
      bio: "Frank Herbert (1920-1986) was born in Tacoma, Washington, and educated at the University of Washington, Seattle. He worked a wide variety of jobs—including TV cameraman, radio commentator, oyster diver, jungle survival instructor, lay analyst, creative writing teacher, reporter and editor of several West Coast newspapers—before becoming a full-time writer. He is best known for his classic science fiction novel Dune and its five sequels.",
      imageUrl: "auth-FrankHerbert.jpeg"
    }),
    Author.create({
      name: "Toni Morrison",
      bio: "Toni Morrison was awarded the Nobel Prize for Literature in 1993. She is the author of several novels, including The Bluest Eye, Beloved (made into a major film), and Love. She has received the National Book Critics Circle Award and a Pulitzer Prize. She is the Robert F. Goheen Professor at Princeton University.",
      imageUrl: "auth-ToniMor.jpeg"
    }),
    Author.create({
      name: "Philip K. Dick",
      bio: "Over a writing career that spanned three decades, Philip K. Dick (1928-1982) published 36 science fiction novels and 121 short stories in which he explored the essence of what makes man human and the dangers of centralized power. Toward the end of his life, his work turned toward deeply personal, metaphysical questions concerning the nature of God. Eleven novels and short stories have been adapted to film; notably: Blade Runner (based on Do Androids Dream of Electric Sheep?), Total Recall, Minority Report, and A Scanner Darkly. The recipient of critical acclaim and numerous awards throughout his career, Dick was inducted into the Science Fiction Hall of Fame in 2005, and in 2007 the Library of America published a selection of his novels in three volumes. His work has been translated into more than twenty-five languages.",
      imageUrl: "auth-PKD.jpeg"
    }),
    Author.create({
      name: "Ernest Hemingway",
      bio: "The preeminent American novelist and short story writer of his time, Ernest Hemingway (1899-1961) wrote provocative fiction steeped in the experiences of the Lost Generation that came of age during World War I. Hemingway's four best-known books — The Sun Also Rises, A Farewell to Arms, For Whom the Bell Tolls, and the Pulitzer Prize-winning The Old Man and the Sea — highlight the author's trademark economy of style while depicting lives shaped by futility, frustration, and disappointment. He won the Nobel Prize in Literature in 1954.",
      imageUrl: "auth-hemingway.jpeg"
    }),
    Author.create({
      name: "Gabriel Garcia Marquez",
      bio: "One of the most important writers of the 20th century, Gabriel Garcí­a Márquez (1927-2014) was a Colombian novelist, short-story writer, screenwriter, and journalist who popularized magical realism, a technique which uses magical elements and events in order to explain real experiences. In 1982, he was awarded the Nobel Prize in Literature. He is perhaps best known for his book One Hundred Years of Solitude (1967), a novel that was both a critical and commercial success.",
      imageUrl: "auth-GabrielGM.jpeg"
    }),
    Author.create({
      name: "George Orwell",
      bio: "George Orwell (1903¿1950) was an English novelist, essayist, journalist, and critic. Best known for his dystopian book 1984 and the allegorical novella Animal Farm, Orwell is the author of six novels as well as numerous essays and works of nonfiction. His writing continues to influence popular culture: The term 'Orwellian' (describing a repressive, totalitarian state) has entered the language, along with several of his own neologisms, such as 'Big Brother' and 'cold war.'",
      imageUrl: "auth-GeorgeOrwell.jpeg"
    }),
    Author.create({
      name: "Marjin Haverbeke",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Mark Lutz",
      bio: "some person",
    }),
    Author.create({
      name: "Carl Sagan",
      bio: "Carl Sagan was Professor of Astronomy and Space Sciences and Director of the Laboratory for Planetary Studies at Cornell University. He played a leading role in the Mariner, Viking, and Voyager spacecraft expeditions to the planets, for which he received the NASA medals for Exceptional Scientific Achievement. Dr. Sagan received the Pulitzer Prize and the highest awards of both the National Academy of Sciences and the National Science Foundation, and many other awards, for his contributions to science, literature, education, and the preservation of the environment. His book Cosmos (accompanying his Emmy- and Peabody Award-winning television series of the same name) was the bestselling science book ever published in the English language, and his bestselling novel, Contact, was turned into a major motion picture.",
      imageUrl: "auth-CarlSagan.jpeg"
    }),
    Author.create({
      name: "Tara Westover",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Shel Silverstein",
      bio: "Shel Silverstein, the author-artist of many books of prose and poetry, was a cartoonist, playwright, poet, performer, recording artist, and Grammy-winning, Oscar-nominated songwriter. A man of many talents, Shel Silverstein reached out to children as well as adults with his writing and illustrations, and his numerous books include The Giving Tree, Where the Sidewalk Ends, A Light in the Attic, Falling Up, and Every Thing On It.",
      imageUrl: "auth-ShelSilver.jpeg"
    }),
    Author.create({
      name: "Sheryl Sandberg",
      bio: "Sheryl Sandberg is Chief Operating Officer at Facebook and the author of Lean In: Women, Work, and the Will to Lead. Prior to Facebook, Sandberg was vice president of Global Online Sales and Operations at Google. She previously served as Chief of Staff for the United States Treasury Department under President Bill Clinton and began her career as an economist with the World Bank. She received B.A. and M.B.A degrees from Harvard University.",
      imageUrl: "auth-SherylSandberg.jpeg"
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
      bio: "Lena Dunham is an American filmmaker and actress. She wrote and directed the independent film Tiny Furniture (2010), and is the creator and star of the HBO series Girls. In 2013, Dunham was named one of Time's most influential people in the world.",
      imageUrl: "auth-LenaDunham.jpeg"
    }),
    Author.create({
      name: "Michael Cunningham",
      bio: "Michael Cunningham (b. 1952) was raised in Los Angeles and lives in New York City. He is the author of the novels A Home at the End of the World, Flesh and Blood, The Hours (winner of the PEN/Faulkner Award and the Pulitzer Prize), Specimen Days, and By Nightfall, as well as Land’s End: A Walk in Provincetown. The Hours was chosen as a Best Book of 1998 by The New York Times and was the basis for a feature film.",
      imageUrl: "auth-MichaelC.jpeg"
    }),
    Author.create({
      name: "Virginia Woolf",
      bio: "some person",
      imageUrl: "auth-VirginiaWoolf.jpeg"
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
      bio: "Patrick Rothfuss had the good fortune to be born in Wisconsin in 1973, where the long winters and lack of cable television encouraged a love of reading and writing. After abandoning his chosen field of chemical engineering, Pat became an itinerant student, wandering through clinical psychology, philosophy, medieval history, theater, and sociology. Nine years later, Pat was forced by university policy to finally complete his undergraduate degree in English.",
      imageUrl: "auth-PatrickRoth.jpeg"
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
      bio: "Jeffrey Eugenides was born in Detroit and attended Brown and Stanford Universities. His first novel, The Virgin Suicides, was published by Farrar, Straus, & Giroux to great acclaim in 1993, and he has received numerous awards for his work.",
      imageUrl: "auth-jeffreyEug.jpeg"
    }),
    Author.create({
      name: "Taylor Jenkins Reid",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Isabel Wilkerson",
      bio: "Isabel Wilkerson, winner of the Pulitzer Prize and the National Humanities Medal, is the author the critically acclaimed New York Times bestsellers The Warmth of Other Suns, and Caste: The Origins of Our Discontents. Wilkerson won the Pulitzer Prize for her work as Chicago Bureau Chief of The New York Times in 1994, making her the first black woman in the history of American journalism to win a Pulitzer and the first African-American to win for individual reporting. In 2016, President Barack Obama awarded her the National Humanities Medal for 'championing the stories of an unsung history.'",
      imageUrl: "auth-isabelWilk.jpeg"
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
    Author.create({
      name: "Christopher McDougal",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Antoine De Saint Exupery",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Chad Harbach",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Stephen Hawking",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Shonda Rhimes",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Heather Havrilesky",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Tayari Jones",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Gail Honeyman",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Molly Baz",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Claire Saffitz",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Alison Bechdel",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Alan Moore",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Art Spiegelman",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Tsugumi Ohba",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Brene Brown",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Bill Bryson",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Kristin Hannah",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Kurt Vonnegut",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Hanya Yanagihara",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Sally Rooney",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Erin Jeanne McDowell",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Samin Nosrat",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Riley Sager",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Blake Crouch",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Joe Haldeman",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Chinua Achebe",
      bio: "some person",
      imageUrl: "placeholder"
    }),
    Author.create({
      name: "Khaled Hosseini",
      bio: "some person",
      imageUrl: "placeholder"
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
