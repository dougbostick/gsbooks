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
      imageUrl: "auth-HarukiMurakami.jpeg",
    }),
    Author.create({
      name: "J.K. Rowling",
      bio: "The author of the celebrated Harry Potter series, J. K. Rowling is one of the world's most successful authors. Her books have created a fantastic world — filled with wizards and muggles — that has completely revitalized a love of reading in both kids and adults. In addition to books, the Harry Potter Series includes the play Harry Potter and the Cursed Child, which debuted on the London stage to a sold-out audience. Rowling has also published the novel A Casual Vacancy and several books in the Cormoran Strike series under the pen name Robert Galbraith.",
      imageUrl: "auth-JKRowling.jpeg",
    }),
    Author.create({
      name: "George R.R. Martin",
      bio: "An American author and screenwriter, George R. R. Martin is best known for his epic fantasy series A Song of Ice and Fire. The bestselling series, which began with A Game of Thrones, inspired the popular HBO television series of the same name. The series will conclude with the forthcoming books The Winds of Winter and A Dream of Spring. Other works set in or about Westeros include The World of Ice and Fire, and A Knight of the Seven Kingdoms. His science fiction novella Nightflyers has also been adapted as a television series; and he is the creator of the shared-world Wild Cards universe, working with the finest writers in the genre.",
      imageUrl: "auth-GRRM.jpeg",
    }),
    Author.create({
      name: "Min Jin Lee",
      bio: "Min Jin Lee is a recipient of fiction fellowships from the Guggenheim Foundation and the Radcliffe Institute of Advanced Study at Harvard. Her second novel Pachinko (2017) was a finalist for the National Book Award for Fiction, runner-up for the Dayton Literary Peace Prize, winner of the Medici Book Club Prize, and a New York Times 10 Best Books of 2017. A New York Times Bestseller, Pachinko was also a Top 10 Books of the Year for BBC, Canadian Broadcasting Corporation, and the New York Public Library. Pachinko was a selection for “Now Read This,” the joint book club of PBS NewsHour and The New York Times. It was on over 75 best books of the year lists, including NPR, PBS, and CNN. Pachinko will be translated into 25 languages. Lee’s debut novel Free Food for Millionaires (2007) was a Top 10 Books of the Year for The Times of London, NPR's Fresh Air, USA Today, and a national bestseller. Her writings have appeared in The New Yorker, NPR's Selected Shorts, One Story, The New York Review of Books, The New York Times Magazine, The New York Times Book Review, The Times Literary Supplement, The Guardian, Conde Nast Traveler, The Times of London, and Wall Street Journal. She served three consecutive seasons as a Morning Forum columnist of the Chosun Ilbo of South Korea. In 2018, Lee was named as an Adweek Creative 100 for being one of the “10 Writers and Editors Who are Changing the National Conversation” and a Frederick Douglass 200. She received an honorary degree of Doctor of Humane Letters from Monmouth College. She will be a Writer-in-Residence at Amherst College from 2019-2022.",
      imageUrl: "auth-MinJinLee.jpeg",
    }),
    Author.create({
      name: "Ursula K. LeGuin",
      bio: "Ursula Kroeber Le Guin is an American author of novels, children's books, and short stories, mainly in the genres of fantasy and science fiction. She has also written poetry and essays. First published in the 1960s, her work has often depicted futuristic or imaginary alternative worlds in politics, the natural environment, gender, religion, sexuality and ethnography. She has won the Hugo Award, Nebula Award, Locus Award, and World Fantasy Award, each more than once. In 2014, she was awarded the National Book Foundation Medal for Distinguished Contribution to American Letters. ",
      imageUrl: "auth-UrsulaLeguin.jpeg",
    }),
    Author.create({
      name: "Frank Herbert",
      bio: "Frank Herbert (1920-1986) was born in Tacoma, Washington, and educated at the University of Washington, Seattle. He worked a wide variety of jobs—including TV cameraman, radio commentator, oyster diver, jungle survival instructor, lay analyst, creative writing teacher, reporter and editor of several West Coast newspapers—before becoming a full-time writer. He is best known for his classic science fiction novel Dune and its five sequels.",
      imageUrl: "auth-FrankHerbert.jpeg",
    }),
    Author.create({
      name: "Toni Morrison",
      bio: "Toni Morrison was awarded the Nobel Prize for Literature in 1993. She is the author of several novels, including The Bluest Eye, Beloved (made into a major film), and Love. She has received the National Book Critics Circle Award and a Pulitzer Prize. She is the Robert F. Goheen Professor at Princeton University.",
      imageUrl: "auth-ToniMor.jpeg",
    }),
    Author.create({
      name: "Philip K. Dick",
      bio: "Over a writing career that spanned three decades, Philip K. Dick (1928-1982) published 36 science fiction novels and 121 short stories in which he explored the essence of what makes man human and the dangers of centralized power. Toward the end of his life, his work turned toward deeply personal, metaphysical questions concerning the nature of God. Eleven novels and short stories have been adapted to film; notably: Blade Runner (based on Do Androids Dream of Electric Sheep?), Total Recall, Minority Report, and A Scanner Darkly. The recipient of critical acclaim and numerous awards throughout his career, Dick was inducted into the Science Fiction Hall of Fame in 2005, and in 2007 the Library of America published a selection of his novels in three volumes. His work has been translated into more than twenty-five languages.",
      imageUrl: "auth-PKD.jpeg",
    }),
    Author.create({
      name: "Ernest Hemingway",
      bio: "The preeminent American novelist and short story writer of his time, Ernest Hemingway (1899-1961) wrote provocative fiction steeped in the experiences of the Lost Generation that came of age during World War I. Hemingway's four best-known books — The Sun Also Rises, A Farewell to Arms, For Whom the Bell Tolls, and the Pulitzer Prize-winning The Old Man and the Sea — highlight the author's trademark economy of style while depicting lives shaped by futility, frustration, and disappointment. He won the Nobel Prize in Literature in 1954.",
      imageUrl: "auth-hemingway.jpeg",
    }),
    Author.create({
      name: "Gabriel Garcia Marquez",
      bio: "One of the most important writers of the 20th century, Gabriel Garcí­a Márquez (1927-2014) was a Colombian novelist, short-story writer, screenwriter, and journalist who popularized magical realism, a technique which uses magical elements and events in order to explain real experiences. In 1982, he was awarded the Nobel Prize in Literature. He is perhaps best known for his book One Hundred Years of Solitude (1967), a novel that was both a critical and commercial success.",
      imageUrl: "auth-GabrielGM.jpeg",
    }),
    Author.create({
      name: "George Orwell",
      bio: "George Orwell (1903¿1950) was an English novelist, essayist, journalist, and critic. Best known for his dystopian book 1984 and the allegorical novella Animal Farm, Orwell is the author of six novels as well as numerous essays and works of nonfiction. His writing continues to influence popular culture: The term 'Orwellian' (describing a repressive, totalitarian state) has entered the language, along with several of his own neologisms, such as 'Big Brother' and 'cold war.'",
      imageUrl: "auth-GeorgeOrwell.jpeg",
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
      imageUrl: "auth-CarlSagan.jpeg",
    }),
    Author.create({
      name: "Tara Westover",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Shel Silverstein",
      bio: "Shel Silverstein, the author-artist of many books of prose and poetry, was a cartoonist, playwright, poet, performer, recording artist, and Grammy-winning, Oscar-nominated songwriter. A man of many talents, Shel Silverstein reached out to children as well as adults with his writing and illustrations, and his numerous books include The Giving Tree, Where the Sidewalk Ends, A Light in the Attic, Falling Up, and Every Thing On It.",
      imageUrl: "auth-ShelSilver.jpeg",
    }),
    Author.create({
      name: "Sheryl Sandberg",
      bio: "Sheryl Sandberg is Chief Operating Officer at Facebook and the author of Lean In: Women, Work, and the Will to Lead. Prior to Facebook, Sandberg was vice president of Global Online Sales and Operations at Google. She previously served as Chief of Staff for the United States Treasury Department under President Bill Clinton and began her career as an economist with the World Bank. She received B.A. and M.B.A degrees from Harvard University.",
      imageUrl: "auth-SherylSandberg.jpeg",
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
      imageUrl: "auth-LenaDunham.jpeg",
    }),
    Author.create({
      name: "Michael Cunningham",
      bio: "Michael Cunningham (b. 1952) was raised in Los Angeles and lives in New York City. He is the author of the novels A Home at the End of the World, Flesh and Blood, The Hours (winner of the PEN/Faulkner Award and the Pulitzer Prize), Specimen Days, and By Nightfall, as well as Land’s End: A Walk in Provincetown. The Hours was chosen as a Best Book of 1998 by The New York Times and was the basis for a feature film.",
      imageUrl: "auth-MichaelC.jpeg",
    }),
    Author.create({
      name: "Virginia Woolf",
      bio: "some person",
      imageUrl: "auth-VirginiaWoolf.jpeg",
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
      imageUrl: "auth-PatrickRoth.jpeg",
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
      imageUrl: "auth-jeffreyEug.jpeg",
    }),
    Author.create({
      name: "Taylor Jenkins Reid",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Isabel Wilkerson",
      bio: "Isabel Wilkerson, winner of the Pulitzer Prize and the National Humanities Medal, is the author the critically acclaimed New York Times bestsellers The Warmth of Other Suns, and Caste: The Origins of Our Discontents. Wilkerson won the Pulitzer Prize for her work as Chicago Bureau Chief of The New York Times in 1994, making her the first black woman in the history of American journalism to win a Pulitzer and the first African-American to win for individual reporting. In 2016, President Barack Obama awarded her the National Humanities Medal for 'championing the stories of an unsung history.'",
      imageUrl: "auth-isabelWilk.jpeg",
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
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Antoine De Saint Exupery",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Chad Harbach",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Stephen Hawking",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Shonda Rhimes",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Heather Havrilesky",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Tayari Jones",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Gail Honeyman",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Molly Baz",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Claire Saffitz",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Alison Bechdel",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Alan Moore",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Art Spiegelman",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Tsugumi Ohba",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Brene Brown",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Bill Bryson",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Kristin Hannah",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Kurt Vonnegut",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Hanya Yanagihara",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Sally Rooney",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Erin Jeanne McDowell",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Samin Nosrat",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Riley Sager",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Blake Crouch",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Joe Haldeman",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Chinua Achebe",
      bio: "some person",
      imageUrl: "placeholder",
    }),
    Author.create({
      name: "Khaled Hosseini",
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
      isbn: "9781408855898",
      thumbUrl:
        "http://books.google.com/books/content?id=35rHBAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "Celebrate 20 years of Harry Potter magic! Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!These new editions of the classic and internationally bestselling, multi-award-winning series feature instantly pick-up-able new jackets by Jonny Duddle, with huge child appeal, to bring Harry Potter to the next generation of readers. It's time to PASS THE MAGIC ON ...",
    }),
    Product.create({
      name: "Pachinko",
      price: 17.99,
      author: "Min Jin Lee",
      categoryId: historicalFiction.id,
      isbn: "9781455563913",
      thumbUrl:
        "http://books.google.com/books/content?id=cxteDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A New York Times Top Ten Book of the Year and National Book Award finalist, Pachinko is an \"extraordinary epic\" of four generations of a poor Korean immigrant family as they fight to control their destiny in 20th-century Japan (San Francisco Chronicle). NEW YORK TIMES NOTABLE BOOK OF 2017 * A USA TODAY TOP TEN OF 2017 * JULY PICK FOR THE PBS NEWSHOUR-NEW YORK TIMES BOOK CLUB NOW READ THIS * FINALIST FOR THE 2018DAYTON LITERARY PEACE PRIZE* WINNER OF THE MEDICI BOOK CLUB PRIZE Roxane Gay's Favorite Book of 2017, Washington Post NEW YORK TIMES BESTSELLER * #1 BOSTON GLOBE BESTSELLER * USA TODAY BESTSELLER * WALL STREET JOURNAL BESTSELLER * WASHINGTON POST BESTSELLER \"There could only be a few winners, and a lot of losers. And yet we played on, because we had hope that we might be the lucky ones.\" In the early 1900s, teenaged Sunja, the adored daughter of a crippled fisherman, falls for a wealthy stranger at the seashore near her home in Korea. He promises her the world, but when she discovers she is pregnant--and that her lover is married--she refuses to be bought. Instead, she accepts an offer of marriage from a gentle, sickly minister passing through on his way to Japan. But her decision to abandon her home, and to reject her son's powerful father, sets off a dramatic saga that will echo down through the generations. Richly told and profoundly moving, Pachinko is a story of love, sacrifice, ambition, and loyalty. From bustling street markets to the halls of Japan's finest universities to the pachinko parlors of the criminal underworld, Lee's complex and passionate characters--strong, stubborn women, devoted sisters and sons, fathers shaken by moral crisis--survive and thrive against the indifferent arc of history.",
    }),
    Product.create({
      name: "Left Hand of Darkness",
      price: 9.99,
      author: "Ursula K. Le Guin",
      categoryId: scienceFiction.id,
      isbn: "9781473221635",
      thumbUrl:
        "http://books.google.com/books/content?id=MDveDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "'A rich and complex story of friendship and love' GUARDIAN 'It's a giant thought experiment that's also a cracking good read about gender' Neil Gaiman 'Love doesn't just sit there, like a stone, it has to be made, like bread; remade all the time, made new' Two people, until recently strangers, find themselves on a long, tortuous and dangerous journey across the ice. One is an outcast, forced to leave his beloved homeland; the other is fleeing from a different kind of persecution. What they have in common is curiosity, about others and themselves, and an almost unshakeable belief that the world can be a better place. As they journey for over 800 miles, across the harshest, most inhospitable landscape, they discover the true meaning of friendship, and of love.",
    }),
    Product.create({
      name: "The Bluest Eye",
      price: 15.99,
      author: "Toni Morrison",
      categoryId: generalFiction.id,
      isbn: "1417664665",
      thumbUrl:
        "http://books.google.com/books/content?id=CF5RcAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "The story of Pecola Breedlove profiles an eleven-year-old Black girl growing up in an America that values blue-eyed blondes and the tragedy that results from her longing to be accepted.",
    }),
    Product.create({
      name: "Dune",
      price: 9.99,
      author: "Frank Herbert",
      categoryId: scienceFiction.id,
      isbn: "9780441013593",
      thumbUrl:
        "http://books.google.com/books/content?id=e_9MDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.",
    }),
    Product.create({
      name: "Do Androids Dream of Electric Sheep",
      price: 11.99,
      author: "Philip K. Dick",
      categoryId: scienceFiction.id,
      isbn: "9780345508553",
      thumbUrl:
        "http://books.google.com/books/content?id=BzMyAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "A masterpiece ahead of its time, a prescient rendering of a dark future, and the inspiration for the blockbuster film Blade Runner By 2021, the World War has killed millions, driving entire species into extinction and sending mankind off-planet. Those who remain covet any living creature, and for people who can’t afford one, companies built incredibly realistic simulacra: horses, birds, cats, sheep. They’ve even built humans. Immigrants to Mars receive androids so sophisticated they are indistinguishable from true men or women. Fearful of the havoc these artificial humans can wreak, the government bans them from Earth. Driven into hiding, unauthorized androids live among human beings, undetected. Rick Deckard, an officially sanctioned bounty hunter, is commissioned to find rogue androids and “retire” them. But when cornered, androids fight back—with lethal force. Praise for Philip K. Dick “The most consistently brilliant science fiction writer in the world.”—John Brunner “A kind of pulp-fiction Kafka, a prophet.”—The New York Times “[Philip K. Dick] sees all the sparkling—and terrifying—possibilities . . . that other authors shy away from.”—Rolling Stone",
    }),
    Product.create({
      name: "For Whom The Bell Tolls",
      price: 10.99,
      author: "Ernest Hemingway",
      categoryId: generalFiction.id,
      isbn: "0684803356",
      thumbUrl:
        "http://books.google.com/books/content?id=-08IVs9NR14C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "Ernest Hemingway's masterpiece on war, love, loyalty, and honor tells the story of Robert Jordan, an antifascist American fighting in the Spanish Civil War. In 1937 Ernest Hemingway traveled to Spain to cover the civil war there for the North American Newspaper Alliance. Three years later he completed the greatest novel to emerge from “the good fight” and one of the foremost classics of war literature. For Whom the Bell Tolls tells of loyalty and courage, love and defeat, and the tragic death of an ideal. Robert Jordan, a young American in the International Brigades, is attached to an antifascist guerilla unit in the mountains of Spain. In his portrayal of Jordan’s love for the beautiful Maria and his superb account of a guerilla leader’s last stand, Hemingway creates a work at once rare and beautiful, strong and brutal, compassionate, moving, and wise. Greater in power, broader in scope, and more intensely emotional than any of the author’s previous works, For Whom the Bell Tolls stands as one of the best war novels ever written.",
    }),
    Product.create({
      name: "The Wind-Up Bird Chronicle",
      price: 15.99,
      author: "Haruki Murakami",
      categoryId: worldLit.id,
      isbn: "9780307762702",
      thumbUrl:
        "http://books.google.com/books/content?id=A_mQPAqfte8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The Wind-Up Bird Chronicle is a tour de force—and one of Haruki Murakami’s most acclaimed and beloved novels. In a Tokyo suburb, a young man named Toru Okada searches for his wife’s missing cat—and then for his wife as well—in a netherworld beneath the city’s placid surface. As these searches intersect, he encounters a bizarre group of allies and antagonists. Gripping, prophetic, and suffused with comedy and menace, this is an astonishingly imaginative detective story, an account of a disintegrating marriage, and an excavation of the buried secrets from Japan’s forgotten campaign in Manchuria during World War II.",
    }),
    Product.create({
      name: "Hard Boiled Wonderland and the End of the World",
      price: 15.99,
      author: "Haruki Murakami",
      categoryId: fantasy.id,
      isbn: "9780307781093",
      thumbUrl:
        "http://books.google.com/books/content?id=BgruFujfHF8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "In this hyperkinetic and relentlessly inventive novel, Japan’s most popular (and controversial) fiction writer hurtles into the consciousness of the West. Hard-Boiled Wonderland and the End of the World draws readers into a narrative particle accelerator in which a split-brained data processor, a deranged scientist, his shockingly undemure granddaughter, Lauren Bacall, Bob Dylan, and various thugs, librarians, and subterranean monsters collide to dazzling effect. What emerges is simultaneously cooler than zero and unaffectedly affecting, a hilariously funny and deeply serious meditation on the nature and uses of the mind. From the Trade Paperback edition.",
    }),
    Product.create({
      name: "One Hundred Years of Solitude",
      price: 15.99,
      author: "Gabriel Garcia Marquez",
      categoryId: worldLit.id,
      isbn: "9780060531041",
      thumbUrl:
        "http://books.google.com/books/content?id=pgPWOaOctq8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "One of the 20th century's enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning career. The novel tells the story of the rise and fall of the mythical town of Macondo through the history of the Buendía family. It is a rich and brilliant chronicle of life and death, and the tragicomedy of humankind. In the noble, ridiculous, beautiful, and tawdry story of the Buendía family, one sees all of humanity, just as in the history, myths, growth, and decay of Macondo, one sees all of Latin America. Love and lust, war and revolution, riches and poverty, youth and senility -- the variety of life, the endlessness of death, the search for peace and truth -- these universal themes dominate the novel. Whether he is describing an affair of passion or the voracity of capitalism and the corruption of government, Gabriel García Márquez always writes with the simplicity, ease, and purity that are the mark of a master. Alternately reverential and comical, One Hundred Years of Solitude weaves the political, personal, and spiritual to bring a new consciousness to storytelling. Translated into dozens of languages, this stunning work is no less than an accounting of the history of the human race.",
    }),
    Product.create({
      name: "1984",
      price: 8.99,
      author: "George Orwell",
      categoryId: scienceFiction.id,
      isbn: "9789198577815",
      thumbUrl:
        "http://books.google.com/books/content?id=AJ4REAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        'George Orwell\'s Nineteen Eighty-Four is unquestionably the most famous dystopian novel of all times. Written in the year of 1948, the author swapped the last two digits while describing a future totalitarian society where the minds, attitudes and actions of the subjects are thoroughly scrutinized by the "Thought Police", suspected dissidents tracked down and where the worship of the mythical party leader Big Brother is forced upon the masses. The low-ranking party member Winston Smith begins secretly to question the whole system and initiates a forbidden love affair with another party member.',
    }),
    Product.create({
      name: "Eloquent Javascript",
      price: 8.99,
      author: "Marjin Haverbeke",
      categoryId: sciAndComp.id,
      isbn: "9781593279509",
      thumbUrl:
        "http://books.google.com/books/content?id=p1v6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Completely revised and updated, this best-selling introduction to programming in JavaScript focuses on writing real applications. JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications. This much anticipated and thoroughly revised third edition of Eloquent JavaScript dives deep into the JavaScript language to show you how to write beautiful, effective code. It has been updated to reflect the current state of Java¬Script and web browsers and includes brand-new material on features like class notation, arrow functions, iterators, async functions, template strings, and block scope. A host of new exercises have also been added to test your skills and keep you on track. As with previous editions, Haverbeke continues to teach through extensive examples and immerses you in code from the start, while exercises and full-chapter projects give you hands-on experience with writing your own programs. You start by learning the basic structure of the JavaScript language as well as control structures, functions, and data structures to help you write basic programs. Then you'll learn about error handling and bug fixing, modularity, and asynchronous programming before moving on to web browsers and how JavaScript is used to program them. As you build projects such as an artificial life simulation, a simple programming language, and a paint program, you'll learn how to: - Understand the essential elements of programming, including syntax, control, and data - Organize and clarify your code with object-oriented and functional programming techniques - Script the browser and make basic web applications - Use the DOM effectively to interact with browsers - Harness Node.js to build servers and utilities Isn't it time you became fluent in the language of the Web? * All source code is available online in an inter¬active sandbox, where you can edit the code, run it, and see its output instantly.",
    }),
    Product.create({
      name: "Learning Python",
      price: 8.99,
      author: "Mark Lutz",
      categoryId: sciAndComp.id,
      isbn: "9781449355692",
      thumbUrl:
        "http://books.google.com/books/content?id=4pgQfXQvekcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Get a comprehensive, in-depth introduction to the core Python language with this hands-on book. Based on author Mark Lutz’s popular training course, this updated fifth edition will help you quickly write efficient, high-quality code with Python. It’s an ideal way to begin, whether you’re new to programming or a professional developer versed in other languages. Complete with quizzes, exercises, and helpful illustrations, this easy-to-follow, self-paced tutorial gets you started with both Python 2.7 and 3.3— the latest releases in the 3.X and 2.X lines—plus all other releases in common use today. You’ll also learn some advanced language features that recently have become more common in Python code. Explore Python’s major built-in object types such as numbers, lists, and dictionaries Create and process objects with Python statements, and learn Python’s general syntax model Use functions to avoid code redundancy and package code for reuse Organize statements, functions, and other tools into larger components with modules Dive into classes: Python’s object-oriented programming tool for structuring code Write large programs with Python’s exception-handling model and development tools Learn advanced Python tools, including decorators, descriptors, metaclasses, and Unicode processing",
    }),
    Product.create({
      name: "Cosmos",
      price: 8.99,
      author: "Carl Sagan",
      categoryId: sciAndComp.id,
      isbn: "0349107033",
      thumbUrl:
        "http://books.google.com/books/content?id=7S50PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "* Spacecraft missions to nearby planets * The Library of ancient Alexandria * The human brain * Egyptian hieroglyphics * The origin of life * The death of the sun * The evolution of galaxies * The origins of matter, suns and worlds The story of fifteen billion years of cosmic evolution transforming matter and life into consciousness, of how science and civilisation grew up together, and of the forces and individuals who helped shape modern science. A story told with Carl Sagan's remarkable ability to make scientific ideas both comprehensible and exciting.",
    }),
    Product.create({
      name: "Contact",
      price: 8.99,
      author: "Carl Sagan",
      categoryId: scienceFiction.id,
      isbn: "9781501172311",
      thumbUrl:
        "http://books.google.com/books/content?id=pO6mDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Pulitzer Prize-winning author and astronomer Carl Sagan imagines the greatest adventure of all—the discovery of an advanced civilization in the depths of space. In December of 1999, a multinational team journeys out to the stars, to the most awesome encounter in human history. Who—or what—is out there? In Cosmos, Carl Sagan explained the universe. In Contact, he predicts its future—and our own.",
    }),
    Product.create({
      name: "Educated",
      price: 8.99,
      author: "Tara Westover",
      categoryId: biography.id,
      isbn: "9780399590511",
      thumbUrl:
        "http://books.google.com/books/content?id=2ObWDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "#1 NEW YORK TIMES, WALL STREET JOURNAL, AND BOSTON GLOBE BESTSELLER • One of the most acclaimed books of our time: an unforgettable memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University “Extraordinary . . . an act of courage and self-invention.”—The New York Times NAMED ONE OF THE TEN BEST BOOKS OF THE YEAR BY THE NEW YORK TIMES BOOK REVIEW • ONE OF PRESIDENT BARACK OBAMA’S FAVORITE BOOKS OF THE YEAR • BILL GATES’S HOLIDAY READING LIST • FINALIST: National Book Critics Circle’s Award In Autobiography and John Leonard Prize For Best First Book • PEN/Jean Stein Book Award • Los Angeles Times Book Prize Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara’s older brothers became violent. When another brother got himself into college, Tara decided to try a new kind of life. Her quest for knowledge transformed her, taking her over oceans and across continents, to Harvard and to Cambridge University. Only then would she wonder if she’d traveled too far, if there was still a way home. “Beautiful and propulsive . . . Despite the singularity of [Westover’s] childhood, the questions her book poses are universal: How much of ourselves should we give to those we love? And how much must we betray them to grow up?”—Vogue NAMED ONE OF THE BEST BOOKS OF THE YEAR BY The Washington Post • O: The Oprah Magazine • Time • NPR • Good Morning America • San Francisco Chronicle • The Guardian • The Economist • Financial Times • Newsday • New York Post • theSkimm • Refinery29 • Bloomberg • Self • Real Simple • Town & Country • Bustle • Paste • Publishers Weekly • Library Journal • LibraryReads • Book Riot • Pamela Paul, KQED • New York Public Library",
    }),
    Product.create({
      name: "Falling Up",
      price: 14.99,
      author: "Shel Silverstein",
      categoryId: childrensLit.id,
      isbn: "9780062999696",
      thumbUrl:
        "http://books.google.com/books/content?id=XlrMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "NOW AVAILABLE AS AN EBOOK! From New York Times bestselling author Shel Silverstein, the classic creator of Where the Sidewalk Ends, A Light in the Attic, and Every Thing On It, comes a wondrous book of poems and drawings. Filled with unforgettable characters like Screamin’ Millie; Allison Beals and her twenty-five eels; Danny O'Dare, the dancin' bear; the Human Balloon; and Headphone Harold, this collection by the celebrated Shel Silverstein will charm young readers and make them want to trip on their shoelaces and fall up too! So come, wander through the Nose Garden, ride the Little Hoarse, eat in the Strange Restaurant, and let the magic of Shel Silverstein open your eyes and tickle your mind. And don't miss these other Shel Silverstein ebooks, The Giving Tree, Where the Sidewalk Ends, and A Light in the Attic!",
    }),
    Product.create({
      name: "A Light in the Attic",
      price: 11.99,
      author: "Shel Silverstein",
      categoryId: childrensLit.id,
      isbn: "0066236177",
      thumbUrl:
        "http://books.google.com/books/content?id=FJfQsgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "Last night while I lay thinking here Some Whatifs crawled inside my ear And pranced and partied all night long And sang their same old Whatif song: Whatif I flunk that test? Whatif green hair grows on my chest? Whatif nobody likes me? Whatif a bolt of lightning strikes me?... To celebrate its 20th anniversary, Shel Silverstein's A Light in the Attic is now available in a special edition containing the classic hardcover book and a CD of highlights from his Grammy Award-winning album. Here in the attic of Shel Silverstein you will find Backward Bill, Sour Face Ann, the Meehoo with an Exactlywatt, and the Polar Bear in the Frigidaire. You will talk with Broiled Face, and find out what happens when Somebody steals your knees, you get caught by the Quick-Digesting Gink, a Mountain snores, and They Put a Brassiere on the Camel. From the creator of the beloved poetry collections Where the Sidewalk Ends and Falling Up, here is another wondrous book of poems and drawings.",
    }),
    Product.create({
      name: "Lean In",
      price: 14.99,
      author: "Sheryl Sandberg",
      categoryId: selfHelp.id,
      isbn: "9780385349956",
      thumbUrl:
        "http://books.google.com/books/content?id=y9_mxZLYiiMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The #1 international best seller In Lean In, Sheryl Sandberg reignited the conversation around women in the workplace. Sandberg is chief operating officer of Facebook and coauthor of Option B with Adam Grant. In 2010, she gave an electrifying TED talk in which she described how women unintentionally hold themselves back in their careers. Her talk, which has been viewed more than six million times, encouraged women to “sit at the table,” seek challenges, take risks, and pursue their goals with gusto. Lean In continues that conversation, combining personal anecdotes, hard data, and compelling research to change the conversation from what women can’t do to what they can. Sandberg provides practical advice on negotiation techniques, mentorship, and building a satisfying career. She describes specific steps women can take to combine professional achievement with personal fulfillment, and demonstrates how men can benefit by supporting women both in the workplace and at home. Written with humor and wisdom, Lean In is a revelatory, inspiring call to action and a blueprint for individual growth that will empower women around the world to achieve their full potential.",
    }),
    Product.create({
      name: "Bowie",
      price: 13.99,
      author: "Wendy Leigh",
      categoryId: biography.id,
      isbn: "1576878066",
      thumbUrl:
        "http://books.google.com/books/content?id=dZkHswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "The mostly never-before-published images in Schapiro's rare collection represent Bowie at his most creative and inspired self and present a glimpse into the intimacy that Schapiro and Bowie shared during their time together. Bowie and Schapiro kidded and laughed about shooting a series of close-up portraits on a putrid green background because they felt it was the worst possible background colour for a magazine, and so they did on this lark - with the image eventually becoming a People magazine cover.",
    }),
    Product.create({
      name: "10% Happier",
      price: 9.99,
      author: "Dan Harris",
      categoryId: selfHelp.id,
      isbn: "9780062265449",
      thumbUrl:
        "http://books.google.com/books/content?id=ycEKAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "#1 New York Times Bestseller REVISED WITH NEW MATIERAL Winner of the 2014 Living Now Book Award for Inspirational Memoir /'An enormously smart, clear-eyed, brave-hearted, and quite personal look at the benefits of meditation./' —Elizabeth Gilbert Nightline anchor Dan Harrisembarks on an unexpected, hilarious, and deeply skeptical odyssey through the strange worlds of spirituality and self-help, and discovers a way to get happier that is truly achievable. After having a nationally televised panic attack, Dan Harris knew he had to make some changes. A lifelong nonbeliever, he found himself on a bizarre adventure involving a disgraced pastor, a mysterious self-help guru, and a gaggle of brain scientists. Eventually, Harris realized that the source of his problems was the very thing he always thought was his greatest asset: the incessant, insatiable voice in his head, which had propelled him through the ranks of a hypercompetitive business, but had also led him to make the profoundly stupid decisions that provoked his on-air freak-out. Finally, Harris stumbled upon an effective way to rein in that voice, something he always assumed to be either impossible or useless: meditation, a tool that research suggests can do everything from lower your blood pressure to essentially rewire your brain. 10% Happier takes readers on a ride from the outer reaches of neuroscience to the inner sanctum of network news to the bizarre fringes of America’s spiritual scene, and leaves them with a takeaway that could actually change their lives.",
    }),
    Product.create({
      name: "Eat Only When You're Hungry",
      price: 12.99,
      author: "Lindsay Hunter",
      categoryId: generalFiction.id,
      isbn: "9780374715991",
      thumbUrl:
        "http://books.google.com/books/content?id=fwHrDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Finalist for the 2017 Chicago Review of Books Fiction Award and a 2017 NPR Great Read Recommended reading by Nylon, Buzzfeed, Vulture, Lit Hub, Chicago Review of Books and Chicago Reader /'With this novel, Hunter establishes herself as an unforgettable voice in American letters. Her work here, as ever, is unparalleled./' —Roxane Gay, author of Bad Feminist and Hunger Achingly funny and full of feeling, Eat Only When You’re Hungry follows fifty-eight-year-old Greg as he searches for his son, GJ, an addict who has been missing for three weeks. Greg is bored, demoralized, obese, and as dubious of GJ’s desire to be found as he is of his own motivation to go looking. Almost on a whim, Greg embarks on a road trip to central Florida—a noble search for his son, or so he tells himself. Greg takes us on a tour of highway and roadside, of Taco Bell, KFC, gas-station Slurpees, sticky strip-club floors, pooling sweat, candy wrappers and crumpled panes of cellophane and wrinkled plastic bags tumbling along the interstate. This is the America Greg knows, one he feels closer to than to his youthful idealism, closer even than to his younger second wife. As his journey continues, through drive-thru windows and into the living rooms of his alluring ex-wife and his distant, curmudgeonly father, Greg’s urgent search for GJ slowly recedes into the background, replaced with a painstaking, illuminating, and unavoidable look at Greg’s own mistakes—as a father, as a husband, and as a man. Brimming with the same visceral regret and joy that leak from the fast food Greg inhales, Eat Only When You’re Hungry is a wild and biting study of addiction, perseverance, and the insurmountable struggle to change. With America’s desolate underbelly serving as her guide, Lindsay Hunter elicits a singular type of sympathy for her characters, using them to challenge our preconceived notions about addiction and to explore the innumerable ways we fail ourselves.",
    }),
    Product.create({
      name: "Not That Kind of Girl",
      price: 16.99,
      author: "Lena Dunham",
      categoryId: biography.id,
      isbn: "9780812995008",
      thumbUrl:
        "http://books.google.com/books/content?id=dVDVAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "High school senior and student body president, Natalie likes to have everything under control, but when she becomes attracted to one of the senior boys and her best friend starts keeping secrets from her, Natalie does not know how to act.",
    }),
    Product.create({
      name: "Attached.",
      price: 15.99,
      author: "Amir Levine M.D., Rachel S.F. Heller M.A.",
      categoryId: selfHelp.id,
      isbn: "9781585429134",
      thumbUrl:
        "http://books.google.com/books/content?id=_O0oDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "“Over a decade after its publication, one book on dating has people firmly in its grip.” —The New York Times We already rely on science to tell us what to eat, when to exercise, and how long to sleep. Why not use science to help us improve our relationships? In this revolutionary book, psychiatrist and neuroscientist Dr. Amir Levine and Rachel Heller scientifically explain why why some people seem to navigate relationships effortlessly, while others struggle. Discover how an understanding of adult attachment—the most advanced relationship science in existence today—can help us find and sustain love. Pioneered by psychologist John Bowlby in the 1950s, the field of attachment posits that each of us behaves in relationships in one of three distinct ways: • Anxious people are often preoccupied with their relationships and tend to worry about their partner's ability to love them back • Avoidant people equate intimacy with a loss of independence and constantly try to minimize closeness. • Secure people feel comfortable with intimacy and are usually warm and loving. Attached guides readers in determining what attachment style they and their mate (or potential mate) follow, offering a road map for building stronger, more fulfilling connections with the people they love.",
    }),
    Product.create({
      name: "The Hours",
      price: 9.99,
      author: "Michael Cunningham",
      categoryId: generalFiction.id,
      isbn: "9781250852687",
      thumbUrl:
        "http://books.google.com/books/content?id=87s9EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Michael Cunningham brings together his Pulitzer Prize–winning novel with the masterpiece that inspired it, Virginia Woolf’s Mrs. Dalloway. In The Hours, the acclaimed author Michael Cunningham draws inventively on the life and work of Virginia Woolf and the story of her novel, Mrs. Dalloway, to tell the story of a group of contemporary characters struggling with the conflicting claims of love and inheritance, hope and despair. In this edition, Cunningham brings his own Pulitzer Prize–winning novel together with Woolf’s masterpiece, which has long been hailed as a groundbreaking work of literary fiction and one of the finest novels written in English. The two novels, published side by side with a new introduction by Cunningham, display the extent of their affinity, and each illuminates new facets of the other in this joint volume. In his introduction, Cunningham re-creates the wonderment of his first encounter with Mrs. Dalloway at fifteen—as he writes, “I was lost. I was gone. I never recovered.” With this edition, Cunningham allows us to disappear into the world of Woolf and into his own brilliant mind.",
    }),
    Product.create({
      name: "A Room of One's Own",
      price: 8.99,
      author: "Virginia Woolf",
      categoryId: generalFiction.id,
      isbn: "9781913724245",
      thumbUrl:
        "http://books.google.com/books/content?id=02QCEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "In October 1928 Virginia Woolf was asked to deliver speeches at Newnham and Girton Colleges on the subject of ‘Women and Fiction’; she spoke about her conviction that ‘a woman must have money and a room of her own if she is to write fiction’. The following year, the two speeches were published as A Room of One’s Own, and became one of the foremost feminist texts. Knitted into a polished argument are several threads of great importance – women and learning, writing and poverty – which helped to establish much of feminist thought on the importance of education and money for women’s independence. In the same breath, Woolf brushes aside critics and sends out a call for solidarity and independence – a call which sent ripples well into the next century. 'Brilliant interweaving of personal experience, imaginative musing and political clarity' — Kate Mosse, The Guardian 'Probably the most influential piece of non-fictional writing by a woman in this century.' — Hermione Lee, The Financial Times",
    }),
    Product.create({
      name: "Quiet",
      price: 12.99,
      author: "Susan Cain",
      categoryId: sciAndComp.id,
      isbn: "9780307452207",
      thumbUrl:
        "http://books.google.com/books/content?id=uyjf3uaQ4TwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "#1 NEW YORK TIMES BESTSELLER • Experience the book that started the Quiet Movement and revolutionized how the world sees introverts—and how introverts see themselves—by offering validation, inclusion, and inspiration “Superbly researched, deeply insightful, and a fascinating read, Quiet is an indispensable resource for anyone who wants to understand the gifts of the introverted half of the population.”—Gretchen Rubin, author of The Happiness Project NAMED ONE OF THE BEST BOOKS OF THE YEAR BY People • O: The Oprah Magazine • Christian Science Monitor • Inc. • Library Journal • Kirkus Reviews At least one-third of the people we know are introverts. They are the ones who prefer listening to speaking; who innovate and create but dislike self-promotion; who favor working on their own over working in teams. It is to introverts—Rosa Parks, Chopin, Dr. Seuss, Steve Wozniak—that we owe many of the great contributions to society. In Quiet, Susan Cain argues that we dramatically undervalue introverts and shows how much we lose in doing so. She charts the rise of the Extrovert Ideal throughout the twentieth century and explores how deeply it has come to permeate our culture. She also introduces us to successful introverts—from a witty, high-octane public speaker who recharges in solitude after his talks, to a record-breaking salesman who quietly taps into the power of questions. Passionately argued, impeccably researched, and filled with indelible stories of real people, Quiet has the power to permanently change how we see introverts and, equally important, how they see themselves. Now with Extra Libris material, including a reader’s guide and bonus content",
    }),
    Product.create({
      name: "The Baking Bible",
      price: 24.99,
      author: "Rose Levy Beranbaum",
      categoryId: cooking.id,
      isbn: "9781118338612",
      thumbUrl:
        "http://books.google.com/books/content?id=iBDUBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Offers baking tips and techniques, with recipes for cakes, tarts, pies, cookies, and breads.",
    }),
    Product.create({
      name: "The Girl on the Train",
      price: 13.99,
      author: "Paula Hawkins",
      categoryId: mysteryThrill.id,
      isbn: "9780698185395",
      thumbUrl:
        "http://books.google.com/books/content?id=Udv-AwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The #1 New York Times Bestseller, USA Today Book of the Year, now a major motion picture starring Emily Blunt. The debut psychological thriller that will forever change the way you look at other people's lives, from the author of Into the Water and A Slow Fire Burning. “Nothing is more addicting than The Girl on the Train.”—Vanity Fair “The Girl on the Train has more fun with unreliable narration than any chiller since Gone Girl. . . . [It] is liable to draw a large, bedazzled readership.”—The New York Times “Marries movie noir with novelistic trickery. . . hang on tight. You'll be surprised by what horrors lurk around the bend.”—USA Today “Like its train, the story blasts through the stagnation of these lives in suburban London and the reader cannot help but turn pages.”—The Boston Globe “Gone Girl fans will devour this psychological thriller.”—People EVERY DAY THE SAME Rachel takes the same commuter train every morning and night. Every day she rattles down the track, flashes past a stretch of cozy suburban homes, and stops at the signal that allows her to daily watch the same couple breakfasting on their deck. She's even started to feel like she knows them. Jess and Jason, she calls them. Their life--as she sees it--is perfect. Not unlike the life she recently lost. UNTIL TODAY And then she sees something shocking. It's only a minute until the train moves on, but it's enough. Now everything's changed. Unable to keep it to herself, Rachel goes to the police. But is she really as unreliable as they say? Soon she is deeply entangled not only in the investigation but in the lives of everyone involved. Has she done more harm than good?",
    }),
    Product.create({
      name: "The Name of the Wind",
      price: 12.99,
      author: "Patrick Rothfuss",
      categoryId: fantasy.id,
      isbn: "0756404746",
      thumbUrl:
        "http://books.google.com/books/content?id=2EounwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "A hero named Kvothe, now living under an assumed name as the humble proprietor of an inn, recounts his transformation from a magically gifted young man into the most notorious wizard, musician, thief, and assassin in his world. Reprint.",
    }),
    Product.create({
      name: "Going Clear Scientology, Hollywood, & the Prison of Belief",
      price: 15.99,
      author: "Lawrence Wright",
      categoryId: nonfiction.id,
      isbn: "9780385350273",
      thumbUrl:
        "http://books.google.com/books/content?id=z4IDPV2hZL0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "National Book Award Finalist A clear-sighted revelation, a deep penetration into the world of Scientology by the Pulitzer Prize-winning author of The Looming Tower, the now-classic study of al-Qaeda’s 9/11 attack. Based on more than two hundred personal interviews with current and former Scientologists—both famous and less well known—and years of archival research, Lawrence Wright uses his extraordinary investigative ability to uncover for us the inner workings of the Church of Scientology. At the book’s center, two men whom Wright brings vividly to life, showing how they have made Scientology what it is today: The darkly brilliant science-fiction writer L. Ron Hubbard, whose restless, expansive mind invented a new religion. And his successor, David Miscavige—tough and driven, with the unenviable task of preserving the church after the death of Hubbard. We learn about Scientology’s complicated cosmology and special language. We see the ways in which the church pursues celebrities, such as Tom Cruise and John Travolta, and how such stars are used to advance the church’s goals. And we meet the young idealists who have joined the Sea Org, the church’s clergy, signing up with a billion-year contract. In Going Clear, Wright examines what fundamentally makes a religion a religion, and whether Scientology is, in fact, deserving of this constitutional protection. Employing all his exceptional journalistic skills of observation, understanding, and shaping a story into a compelling narrative, Lawrence Wright has given us an evenhanded yet keenly incisive book that reveals the very essence of what makes Scientology the institution it is.",
    }),
    Product.create({
      name: "The Buried",
      price: 16.99,
      author: "Peter Hessler",
      categoryId: nonfiction.id,
      isbn: "9781338629316",
      thumbUrl:
        "http://books.google.com/books/content?id=qs_dDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A heart-pounding, claustrophobic new story from Melissa Grey, the author of RATED. Ten years ago, disaster struck the remote town of Indigo Falls. A horrific event drove the residents underground, into shelters that keep them safe from the danger on the surface. No one speaks about what happened that fateful day, but even the youngest still remember the fear and, most of all, the searing pain when sunlight touched their skin. Now, a handful of families inhabit this bunker together, guided by a charismatic leader named Dr. Imogen Moran. There are many rules Dr. Moran has instilled to govern life belowground. You must always tell the truth. You must avoid the light of the sun. You must never touch skin to skin. But the most important rule, the one that was drilled into their heads from the moment the hatch slammed shut all those years ago, was at the very end of the list. It rattled around in their skulls when all was silent, echoing in the quiet, lonely dark. You must never go outside.",
    }),
    Product.create({
      name: "Six of Crows",
      price: 17.99,
      author: "Leigh Bardugo",
      categoryId: fantasy.id,
      isbn: "9781627792127",
      thumbUrl:
        "http://books.google.com/books/content?id=ZCtfCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A glorious Collector's Edition of New York Times bestselling, epic fantasy novel, SIX OF CROWS. Beautifully designed, with an exclusive letter from the author and six stunning full-colour character portraits. This covetable hardback with red sprayed edges is a perfect gift for fans, and a perfect way to discover the unforgettable writing of Leigh Bardugo. Criminal prodigy Kaz Brekker is offered a chance at a deadly heist: break into the Ice Court - a military stronghold that has never been breached - and retrieve a hostage whose knowledge could change Grisha magic forever. To succeed would mean riches beyond his wildest dreams - but he can't pull it off alone . . . A convict with a thirst for revenge. A sharpshooter who can't walk away from a wager. A runaway with a privileged past. A spy known as the Wraith. A Heartrender using her magic to survive the slums. A thief with a gift for unlikely escapes. Six dangerous outcasts. One impossible heist. Together they might just be unstoppable - if they don't kill each other first. 'Fast, thrilling heist fantasy, boasting a brilliant new cast of characters.' METRO 'A full-throttle adventure . . . crackling dialogue and sumptuous description. Bardugo dives deep into this world.' - NEW YORK TIMES",
    }),
    Product.create({
      name: "Middlesex",
      price: 13.99,
      author: "Jeffrey Eugenides",
      categoryId: generalFiction.id,
      isbn: "9781408825693",
      thumbUrl:
        "http://books.google.com/books/content?id=h7utqa_hWoIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The internationally bestselling 2003 Pulitzer Prize winner Reissued to coincide with the publication of The Marriage Plot",
    }),
    Product.create({
      name: "Daisy Jones & the Six",
      price: 18.99,
      author: "Taylor Jenkins Reid",
      categoryId: generalFiction.id,
      isbn: "1524798622",
      thumbUrl:
        "http://books.google.com/books/content?id=m5OBuAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "/'Daisy is a girl coming of age in L.A. in the late sixties, sneaking into clubs on the Sunset Strip, sleeping with rock stars, and dreaming of singing at the Whisky a Go-Go. The sex and drugs are thrilling, but it's the rock and roll she loves most. By the time she's twenty, her voice is getting noticed, and she has the kind of heedless beauty that makes people do crazy things. Another band getting noticed is The Six, led by the brooding Billy Dunne. On the eve of their first tour, his girlfriend Camila finds out she's pregnant, and with the pressure of impending fatherhood and fame, Billy goes a little wild on the road. Daisy and Billy cross paths when a producer realizes the key to supercharged success is to put the two together. What happens next will become the stuff of legend. The making of that legend is chronicled in this riveting and unforgettable novel, written as an oral history of one of the biggest bands of the seventies",
    }),
    Product.create({
      name: "The Warmth of Other Suns",
      price: 16.99,
      author: "Isabel Wilkerson",
      categoryId: nonfiction.id,
      isbn: "9780679763888",
      thumbUrl:
        "http://books.google.com/books/content?id=dt6JDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Presents an epic history that covers the period from the end of World War I through the 1970s, chronicling the decades-long migration of African Americans from the South to the North and West through the stories of three individuals and their families.",
    }),
    Product.create({
      name: "Caste",
      price: 15.99,
      author: "Isabel Wilkerson",
      categoryId: nonfiction.id,
      isbn: "9780593230251",
      thumbUrl:
        "http://books.google.com/books/content?id=_er2DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        " In Caste, Pulitzer Prize-winning author Isabel Wilkerson gives an astounding portrait of this hidden phenomenon. Linking America, India and Nazi Germany, Wilkerson reveals how our world has been shaped by caste - and how its rigid, arbitrary hierarchies still divide us today. With clear-sighted rigour, Wilkerson unearths the eight pillars that connect caste systems across civilizations, and demonstrates how our own era of intensifying conflict and upheaval has arisen as a consequence of caste. Weaving in stories of real people, she shows how its insidious undertow emerges every day; she documents its surprising health costs; and she explores its effects on culture and politics. Finally, Wilkerson points forward to the ways we can - and must - move beyond its artificial divisions, towards our common humanity. Beautifully written and deeply original, Caste is an eye-opening examination of what lies beneath the surface of ordinary lives. No one can afford to ignore the moral clarity of its insights, or its urgent call for a freer, fairer world.",
    }),
    Product.create({
      name: "The New Jim Crow",
      price: 11.99,
      author: "Michelle Alexander",
      categoryId: nonfiction.id,
      isbn: "9781620971949",
      thumbUrl:
        "http://books.google.com/books/content?id=CNOFDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Named one of the most important nonfiction books of the 21st century by Entertainment Weekly‚ Slate‚ Chronicle of Higher Eduction‚ Literary Hub, Book Riot‚ and Zora A tenth-anniversary edition of the iconic bestseller—“one of the most influential books of the past 20 years,” according to the Chronicle of Higher Education—with a new preface by the author “It is in no small part thanks to Alexander’s account that civil rights organizations such as Black Lives Matter have focused so much of their energy on the criminal justice system.” —Adam Shatz, London Review of Books Seldom does a book have the impact of Michelle Alexander’s The New Jim Crow. Since it was first published in 2010, it has been cited in judicial decisions and has been adopted in campus-wide and community-wide reads; it helped inspire the creation of the Marshall Project and the new $100 million Art for Justice Fund; it has been the winner of numerous prizes, including the prestigious NAACP Image Award; and it has spent nearly 250 weeks on the New York Times bestseller list. Most important of all, it has spawned a whole generation of criminal justice reform activists and organizations motivated by Michelle Alexander’s unforgettable argument that “we have not ended racial caste in America; we have merely redesigned it.” As the Birmingham News proclaimed, it is “undoubtedly the most important book published in this century about the U.S.” Now, ten years after it was first published, The New Press is proud to issue a tenth-anniversary edition with a new preface by Michelle Alexander that discusses the impact the book has had and the state of the criminal justice reform movement today.",
    }),
    Product.create({
      name: "Sharp Objects",
      price: 9.99,
      author: "Gillian Flynn",
      categoryId: mysteryThrill.id,
      isbn: "9780297860242",
      thumbUrl:
        "http://books.google.com/books/content?id=HB_DlQ766yMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "From the author of the No.1 bestseller and international phenomenon GONE GIRL. Now a major HBO/SKY ATLANTIC TV series starring Amy Adams, with the director of BIG LITTLE LIES, Jean-Marc Vallee. When two girls are abducted and killed in Missouri, journalist Camille Preaker is sent back to her home town to report on the crimes. Long-haunted by a childhood tragedy and estranged from her mother for years, Camille suddenly finds herself installed once again in her family's mansion, reacquainting herself with her distant mother and the half-sister she barely knows - a precocious 13-year-old who holds a disquieting grip on the town. As Camille works to uncover the truth about these violent crimes, she finds herself identifying with the young victims - a bit too strongly. Clues keep leading to dead ends, forcing Camille to unravel the psychological puzzle of her own past to get at the story. Dogged by her own demons, Camille will have to confront what happened to her years before if she wants to survive this homecoming.",
    }),
    Product.create({
      name: "The First Bad Man",
      price: 12.99,
      author: "Miranda July",
      categoryId: generalFiction.id,
      isbn: "9781439172575",
      thumbUrl:
        "http://books.google.com/books/content?id=rWB5CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Here is Cheryl, a tightly-wound, vulnerable woman who lives alone, with a perpetual lump in her throat. She is haunted by a baby boy she met when she was six, who sometimes recurs as other people's babies. Cheryl is also obsessed with Phillip, a philandering board member at the women's self-defense nonprofit where she works. She believes they've been making love for many lifetimes, though they have yet to consummate in this one. When Cheryl's bosses ask if their twenty-one-year-old daughter, Clee, can move into her house for a little while, Cheryl's eccentrically ordered world explodes. And yet it is Clee--the selfish, cruel blond bombshell--who bullies Cheryl into reality and, unexpectedly, provides her the love of a lifetime. Tender, gripping, slylyhilarious, infused with raging sexual obsession and fierce maternal love, Miranda July's first novel confirms her as a spectacularly original, iconic, and important voice today, and a writer for all time. The First Bad Man is dazzling, disorienting, and unforgettable",
    }),
    Product.create({
      name: "Masters of Sex",
      price: 13.99,
      author: "Thomas Maier",
      categoryId: biography.id,
      isbn: "9780465044993",
      thumbUrl:
        "http://books.google.com/books/content?id=uCPvPwvgCbIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Now a New Showtime Original Series Showtime's dramatic series Masters of Sex, starring Michael Sheen and Lizzy Caplan, is based on this real-life story of sex researchers William Masters and Virginia Johnson. Before Sex and the City and ViagraTM, America relied on Masters and Johnson to teach us everything we needed to know about what goes on in the bedroom. Convincing hundreds of men and women to shed their clothes and copulate, the pair were the nation’s top experts on love and intimacy. Highlighting interviews with the notoriously private Masters and the ambitious Johnson, critically acclaimed biographer Thomas Maier shows how this unusual team changed the way we all thought about, talked about, and engaged in sex while they simultaneously tried to make sense of their own relationship. Entertaining, revealing, and beautifully told, Masters of Sex sheds light on the eternal mysteries of desire, intimacy, and the American psyche.",
    }),
    Product.create({
      name: "Lust & Wonder",
      price: 13.99,
      author: "Augusten Burroughs",
      categoryId: biography.id,
      isbn: "9781619048584",
      thumbUrl:
        "http://books.google.com/books/content?id=djvKy3iTDp4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "You can overcome lust and sexual sin! Overcoming Lust is written for you if you are struggling with sexual sin or are helping others who are struggling. It includes: Ten chapters that will help you understand lust and how to gain victory over it. Ten additional chapters that will show you what the Bible teaches about lust. Helpful discussion questions at the end of each chapter. Many real life examples and stories to learn from. If you diligently apply the truths found in Overcoming Lust, you will gain victory over lust and begin living in a way that pleases God. Visit Overcoming-Lust.com for information about the author, blog posts, book endorsements and additional resources for overcoming lust.",
    }),
    Product.create({
      name: "The Road",
      price: 11.99,
      author: "Cormac McCarthy",
      categoryId: generalFiction.id,
      isbn: "9780307267450",
      thumbUrl:
        "http://books.google.com/books/content?id=PfmjWho_zOAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A searing, post-apocalyptic novel about a father and son's fight to survive, this /'tale of survival and the miracle of goodness only adds to McCarthy's stature as a living master. It's gripping, frightening and, ultimately, beautiful/' (San Francisco Chronicle). A father and his son walk alone through burned America. Nothing moves in the ravaged landscape save the ash on the wind. It is cold enough to crack stones, and when the snow falls it is gray. The sky is dark. Their destination is the coast, although they don't know what, if anything, awaits them there. They have nothing; just a pistol to defend themselves against the lawless bands that stalk the road, the clothes they are wearing, a cart of scavenged food—and each other. The Road is the profoundly moving story of a journey. It boldly imagines a future in which no hope remains, but in which the father and his son, /'each the other's world entire,/' are sustained by love. Awesome in the totality of its vision, it is an unflinching meditation on the worst and the best that we are capable of: ultimate destructiveness, desperate tenacity, and the tenderness that keeps two people alive in the face of total devastation.",
    }),
    Product.create({
      name: "The Four Winds",
      price: 16.99,
      author: "Kristin Hanna",
      categoryId: generalFiction.id,
      isbn: "9781250178626",
      thumbUrl:
        "http://books.google.com/books/content?id=Vw_hDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "/'The Bestselling Hardcover Novel of the Year./'--Publishers Weekly From the number-one bestselling author of The Nightingale and The Great Alone comes a powerful American epic about love and heroism and hope, set during the Great Depression, a time when the country was in crisis and at war with itself, when millions were out of work and even the land seemed to have turned against them. “My land tells its story if you listen. The story of our family.” Texas, 1921. A time of abundance. The Great War is over, the bounty of the land is plentiful, and America is on the brink of a new and optimistic era. But for Elsa Wolcott, deemed too old to marry in a time when marriage is a woman’s only option, the future seems bleak. Until the night she meets Rafe Martinelli and decides to change the direction of her life. With her reputation in ruin, there is only one respectable choice: marriage to a man she barely knows. By 1934, the world has changed; millions are out of work and drought has devastated the Great Plains. Farmers are fighting to keep their land and their livelihoods as crops fail and water dries up and the earth cracks open. Dust storms roll relentlessly across the plains. Everything on the Martinelli farm is dying, including Elsa’s tenuous marriage; each day is a desperate battle against nature and a fight to keep her children alive. In this uncertain and perilous time, Elsa—like so many of her neighbors—must make an agonizing choice: fight for the land she loves or leave it behind and go west, to California, in search of a better life for her family. The Four Winds is a rich, sweeping novel that stunningly brings to life the Great Depression and the people who lived through it—the harsh realities that divided us as a nation and the enduring battle between the haves and the have-nots. A testament to hope, resilience, and the strength of the human spirit to survive adversity, The Four Winds is an indelible portrait of America and the American dream, as seen through the eyes of one indomitable woman whose courage and sacrifice will come to define a generation.",
    }),
    Product.create({
      name: "Atomic Habits",
      price: 17.99,
      author: "James Clear",
      categoryId: selfHelp.id,
      isbn: "9780735211292",
      thumbUrl:
        "http://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The #1 New York Times bestseller. Over 4 million copies sold! Tiny Changes, Remarkable Results No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights. Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field. Learn how to: • make time for new habits (even when life gets crazy); • overcome a lack of motivation and willpower; • design your environment to make success easier; • get back on track when you fall off course; ...and much more. Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.",
    }),
    Product.create({
      name: "The Vanishing Half",
      price: 15.99,
      author: "Brit Bennett",
      categoryId: generalFiction.id,
      isbn: "9780525536963",
      thumbUrl:
        "http://books.google.com/books/content?id=xqRPEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "#1 NEW YORK TIMES BESTSELLER ONE OF BARACK OBAMA'S FAVORITE BOOKS OF THE YEAR NAMED A BEST BOOK OF 2020 BY THE NEW YORK TIMES * THE WASHINGTON POST * NPR * PEOPLE * TIME MAGAZINE* VANITY FAIR * GLAMOUR 2021 WOMEN'S PRIZE FINALIST “Bennett’s tone and style recalls James Baldwin and Jacqueline Woodson, but it’s especially reminiscent of Toni Morrison’s 1970 debut novel, The Bluest Eye.” —Kiley Reid, Wall Street Journal “A story of absolute, universal timelessness …For any era, it's an accomplished, affecting novel. For this moment, it's piercing, subtly wending its way toward questions about who we are and who we want to be….” – Entertainment Weekly From The New York Times-bestselling author of The Mothers, a stunning new novel about twin sisters, inseparable as children, who ultimately choose to live in two very different worlds, one black and one white. The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities. Many years later, one sister lives with her black daughter in the same southern town she once tried to escape. The other secretly passes for white, and her white husband knows nothing of her past. Still, even separated by so many miles and just as many lies, the fates of the twins remain intertwined. What will happen to the next generation, when their own daughters' storylines intersect? Weaving together multiple strands and generations of this family, from the Deep South to California, from the 1950s to the 1990s, Brit Bennett produces a story that is at once a riveting, emotional family story and a brilliant exploration of the American history of passing. Looking well beyond issues of race, The Vanishing Half considers the lasting influence of the past as it shapes a person's decisions, desires, and expectations, and explores some of the multiple reasons and realms in which people sometimes feel pulled to live as something other than their origins. As with her New York Times-bestselling debut The Mothers, Brit Bennett offers an engrossing page-turner about family and relationships that is immersive and provocative, compassionate and wise.",
    }),
    Product.create({
      name: "The Girl Who Smiles Beads",
      price: 14.99,
      author: "Clemantine Wamariya and Elizabeth Weil",
      categoryId: generalFiction.id,
      isbn: "9780451495341",
      thumbUrl:
        "http://books.google.com/books/content?id=ycIwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "“The plot provided by the universe was filled with starvation, war and rape. I would not—could not—live in that tale.” Clemantine Wamariya was six years old when her mother and father began to speak in whispers, when neighbors began to disappear, and when she heard the loud, ugly sounds her brother said were thunder. In 1994, she and her fifteen-year-old sister, Claire, fled the Rwandan massacre and spent the next six years migrating through seven African countries, searching for safety—perpetually hungry, imprisoned and abused, enduring and escaping refugee camps, finding unexpected kindness, witnessing inhuman cruelty. They did not know whether their parents were dead or alive. When Clemantine was twelve, she and her sister were granted refugee status in the United States; there, in Chicago, their lives diverged. Though their bond remained unbreakable, Claire, who had for so long protected and provided for Clemantine, was a single mother struggling to make ends meet, while Clemantine was taken in by a family who raised her as their own. She seemed to live the American dream: attending private school, taking up cheerleading, and, ultimately, graduating from Yale. Yet the years of being treated as less than human, of going hungry and seeing death, could not be erased. She felt at the same time six years old and one hundred years old. In The Girl Who Smiled Beads, Clemantine provokes us to look beyond the label of “victim” and recognize the power of the imagination to transcend even the most profound injuries and aftershocks. Devastating yet beautiful, and bracingly original, it is a powerful testament to her commitment to constructing a life on her own terms.",
    }),
    Product.create({
      name: "Bad Feminist",
      price: 16.99,
      author: "Roxane Gray",
      categoryId: nonfiction.id,
      isbn: "0062282719",
      thumbUrl:
        "http://books.google.com/books/content?id=Gd6CvgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "From the author of Hunger: A Memoir of (My) Body, the New York Times Bestseller and Best Book of the Year at NPR, the Boston Globe, Newsweek, and many more A collection of essays spanning politics, criticism, and feminism from one of the most-watched young cultural observers of her generation, Roxane Gay. “Pink is my favorite color. I used to say my favorite color was black to be cool, but it is pink—all shades of pink. If I have an accessory, it is probably pink. I read Vogue, and I’m not doing it ironically, though it might seem that way. I once live-tweeted the September issue.” In these funny and insightful essays, Roxane Gay takes us through the journey of her evolution as a woman (Sweet Valley High) of color (The Help) while also taking readers on a ride through culture of the last few years (Girls, Django in Chains) and commenting on the state of feminism today (abortion, Chris Brown). The portrait that emerges is not only one of an incredibly insightful woman continually growing to understand herself and our society, but also one of our culture. Bad Feminist is a sharp, funny, and spot-on look at the ways in which the culture we consume becomes who we are, and an inspiring call-to-arms of all the ways we still need to do better, coming from one of our most interesting and important cultural critics.",
    }),
    Product.create({
      name: "Fresh Off the Boat",
      price: 12.99,
      author: "Eddie Huang",
      categoryId: biography.id,
      isbn: "9780812983357",
      thumbUrl:
        "http://books.google.com/books/content?id=oQBwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "“Just may be the best new comedy of [the year] . . . based on restaurateur Eddie Huang’s memoir of the same name . . . [a] classic fresh-out-of-water comedy.”—People “Bawdy and frequently hilarious . . . a surprisingly sophisticated memoir about race and assimilation in America . . . as much James Baldwin and Jay-Z as Amy Tan . . . rowdy [and] vital . . . It’s a book about fitting in by not fitting in at all.”—Dwight Garner, The New York Times NATIONAL BESTSELLER • NAMED ONE OF THE BEST BOOKS OF THE YEAR BY KIRKUS REVIEWS Assimilating ain’t easy. Eddie Huang was raised by a wild family of FOB (“fresh off the boat”) immigrants—his father a cocksure restaurateur with a dark past back in Taiwan, his mother a fierce protector and constant threat. Young Eddie tried his hand at everything mainstream America threw his way, from white Jesus to macaroni and cheese, but finally found his home as leader of a rainbow coalition of lost boys up to no good: skate punks, dealers, hip-hop junkies, and sneaker freaks. This is the story of a Chinese-American kid in a could-be-anywhere cul-de-sac blazing his way through America’s deviant subcultures, trying to find himself, ten thousand miles from his legacy and anchored only by his conflicted love for his family and his passion for food. Funny, moving, and stylistically inventive, Fresh Off the Boat is more than a radical reimagining of the immigrant memoir—it’s the exhilarating story of every American outsider who finds his destiny in the margins. Praise for Fresh Off the Boat “Brash and funny . . . outrageous, courageous, moving, ironic and true.”—New York Times Book Review “Mercilessly funny and provocative, Fresh Off the Boat is also a serious piece of work. Eddie Huang is hunting nothing less than Big Game here. He does everything with style.”—Anthony Bourdain “Uproariously funny . . . emotionally honest.”—Chicago Tribune “Huang is a fearless raconteur. [His] writing is at once hilarious and provocative; his incisive wit pulls through like a perfect plate of dan dan noodles.”—Interview “Although writing a memoir is an audacious act for a thirty-year-old, it is not nearly as audacious as some of the things Huang did and survived even earlier. . . . Whatever he ends up doing, you can be sure it won’t look or sound like anything that’s come before. A single, kinetic passage from Fresh Off the Boat . . . is all you need to get that straight.”—Bookforum",
    }),
    Product.create({
      name: "The Astonishing Color of After",
      price: 19.99,
      author: "Emily X.R. Pan",
      categoryId: generalFiction.id,
      isbn: "9780316464000",
      thumbUrl:
        "http://books.google.com/books/content?id=T60qDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A stunning, heartbreaking debut novel about grief, love, and family, perfect for fans of Jandy Nelson and Celeste Ng. Leigh Chen Sanders is absolutely certain about one thing: When her mother died by suicide, she turned into a bird. Leigh, who is half Asian and half white, travels to Taiwan to meet her maternal grandparents for the first time. There, she is determined to find her mother, the bird. In her search, she winds up chasing after ghosts, uncovering family secrets, and forging a new relationship with her grandparents. And as she grieves, she must try to reconcile the fact that on the same day she kissed her best friend and longtime secret crush, Axel, her mother was taking her own life. Alternating between real and magic, past and present, friendship and romance, hope and despair, The Astonishing Color of After is a stunning and heartbreaking novel about finding oneself through family history, art, grief, and love. /'Emily X.R. Pan's brilliantly crafted, harrowing first novel portrays the vast spectrum of love and grief with heart-wrenching beauty and candor. This is a very special book./'--John Green, bestselling author of The Fault in Our Stars and Turtles All the Way Down",
    }),
    Product.create({
      name: "The Death of Vivek Oji",
      price: 14.99,
      author: "Akwaeke Emezi",
      categoryId: generalFiction.id,
      isbn: "9780525541615",
      thumbUrl:
        "http://books.google.com/books/content?id=wO6_DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "INSTANT NEW YORK TIMES BESTSELLER /'Electrifying./' — O: The Oprah Magazine Named a Best Book of 2020 by The New York Times, The Washington Post, NPR, USA TODAY, Vanity Fair, Elle, Harper's Bazaar, Marie Claire, Shondaland, Teen Vogue, Vulture, Lit Hub, Bustle, Electric Literature, and BookPage What does it mean for a family to lose a child they never really knew? One afternoon, in a town in southeastern Nigeria, a mother opens her front door to discover her son’s body, wrapped in colorful fabric, at her feet. What follows is the tumultuous, heart-wrenching story of one family’s struggle to understand a child whose spirit is both gentle and mysterious. Raised by a distant father and an understanding but overprotective mother, Vivek suffers disorienting blackouts, moments of disconnection between self and surroundings. As adolescence gives way to adulthood, Vivek finds solace in friendships with the warm, boisterous daughters of the Nigerwives, foreign-born women married to Nigerian men. But Vivek’s closest bond is with Osita, the worldly, high-spirited cousin whose teasing confidence masks a guarded private life. As their relationship deepens—and Osita struggles to understand Vivek’s escalating crisis—the mystery gives way to a heart-stopping act of violence in a moment of exhilarating freedom. Propulsively readable, teeming with unforgettable characters, The Death of Vivek Oji is a novel of family and friendship that challenges expectations—a dramatic story of loss and transcendence that will move every reader.",
    }),
    Product.create({
      name: "Freshwater",
      price: 14.99,
      author: "Akwaeke Emezi",
      categoryId: generalFiction.id,
      isbn: "9780802165565",
      thumbUrl:
        "http://books.google.com/books/content?id=_eUoDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A National Book Foundation “5 Under 35” Honoree Finalist for the PEN/Hemingway Award for a Debut Novel Shortlisted for the Center for Fiction First Novel Prize A New York Times Notable Book One of the most highly praised novels of the year, the debut from an astonishing young writer, Freshwater tells the story of Ada, an unusual child who is a source of deep concern to her southern Nigerian family. Young Ada is troubled, prone to violent fits. Born “with one foot on the other side,” she begins to develop separate selves within her as she grows into adulthood. And when she travels to America for college, a traumatic event on campus crystallizes the selves into something powerful and potentially dangerous, making Ada fade into the background of her own mind as these alters—now protective, now hedonistic—move into control. Written with stylistic brilliance and based in the author’s realities, Freshwater dazzles with ferocious energy and serpentine grace.",
    }),
    Product.create({
      name: "The Sun is Also a Star",
      price: 20.99,
      author: "Nicola Yoon",
      categoryId: generalFiction.id,
      isbn: "9780553496703",
      thumbUrl:
        "http://books.google.com/books/content?id=cVDgCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The #1 New York Times bestseller and National Book Award Finalist from the bestselling author of Everything, Everything will have you falling in love with Natasha and Daniel as they fall in love with each other. Natasha: I’m a girl who believes in science and facts. Not fate. Not destiny. Or dreams that will never come true. I’m definitely not the kind of girl who meets a cute boy on a crowded New York City street and falls in love with him. Not when my family is twelve hours away from being deported to Jamaica. Falling in love with him won’t be my story. Daniel: I’ve always been the good son, the good student, living up to my parents’ high expectations. Never the poet. Or the dreamer. But when I see her, I forget about all that. Something about Natasha makes me think that fate has something much more extraordinary in store—for both of us. The Universe: Every moment in our lives has brought us to this single moment. A million futures lie before us. Which one will come true? *** /'Beautifully crafted./'--People Magazine /'A book that is very much about the many factors that affect falling in love, as much as it is about the very act itself . . . fans of Yoon’s first novel, Everything Everything, will find much to love—if not, more—in what is easily an even stronger follow up./' —Entertainment Weekly /'Transcends the limits of YA as a human story about falling in love and seeking out our futures./' —POPSUGAR.com",
    }),
    Product.create({
      name: "The Heart's Invisible Furies",
      price: 21.99,
      author: "John Boyne",
      categoryId: generalFiction.id,
      isbn: "9781524760809",
      thumbUrl:
        "http://books.google.com/books/content?id=wsuXDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Named Book of the Month Club's Book of the Year, 2017 Selected one of New York Times Readers’ Favorite Books of 2017 Winner of the 2018 Goldsboro Books Glass Bell Award From the beloved New York Times bestselling author of The Boy In the Striped Pajamas, a sweeping, heartfelt saga about the course of one man's life, beginning and ending in post-war Ireland Cyril Avery is not a real Avery -- or at least, that's what his adoptive parents tell him. And he never will be. But if he isn't a real Avery, then who is he? Born out of wedlock to a teenage girl cast out from her rural Irish community and adopted by a well-to-do if eccentric Dublin couple via the intervention of a hunchbacked Redemptorist nun, Cyril is adrift in the world, anchored only tenuously by his heartfelt friendship with the infinitely more glamourous and dangerous Julian Woodbead. At the mercy of fortune and coincidence, he will spend a lifetime coming to know himself and where he came from - and over his many years, will struggle to discover an identity, a home, a country, and much more. In this, Boyne's most transcendent work to date, we are shown the story of Ireland from the 1940s to today through the eyes of one ordinary man. The Heart's Invisible Furies is a novel to make you laugh and cry while reminding us all of the redemptive power of the human spirit.",
    }),
    Product.create({
      name: "I Want to Be Where the Normal People Are",
      price: 13.99,
      author: "Rachel Bloom",
      categoryId: biography.id,
      isbn: "9781529354638",
      thumbUrl:
        "http://books.google.com/books/content?id=z6eezQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "In the vein of Mindy Kaling, Ali Wong, and Amy Poehler, a collection of hilarious personal essays, poems and even amusement park maps on the subjects of insecurity, fame, anxiety, and much more from the charming and wickedly funny creator of Crazy Ex-Girlfriend.Rachel Bloom has felt abnormal and out of place her whole life. In this exploration of what she thinks makes her 'different', she's come to realise that a lot of people also feel this way; even people who she otherwise thought were 'normal'.In a collection of laugh-out-loud funny essays, all told in the unique voice (sometimes singing voice) that made her a star, Rachel writes about everything from her love of Disney, OCD and depression, weirdness, and female friendships to the story of how she didn't poop in the toilet until she was four years old. It's a hilarious, smart, and infinitely relatable collection (except for the pooping thing).",
    }),
    Product.create({
      name: "Born to Run",
      price: 14.99,
      author: "Christopher McDougal",
      categoryId: biography.id,
      isbn: "9780307279187",
      thumbUrl:
        "http://books.google.com/books/content?id=QQiPoNLNhLsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Recounts the author's experiences with the reclusive Tarahumara Indians, whose techniques allow them to run long distances with ease, and describes his training for a fifty-mile race with the tribe and a number of ultramarathoners.",
    }),
    Product.create({
      name: "The Little Prince",
      price: 11.99,
      author: "Antoine De Saint Exupery",
      categoryId: childrensLit.id,
      isbn: "9789387669666",
      thumbUrl:
        "http://books.google.com/books/content?id=mTxbDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "First published in 1943, The Little Prince by Antoine de Saint-Exupéry has been translated into more than 250 languages, becoming a global phenomenon. The Sahara desert is the scenery of Little Prince’s story. The narrator’s plane has crashed there and he has scarcely some food and water to survive. Trying to comprehend what caused the crash, the Little Prince appears. The serious blonde little boy asks to draw him a sheep. The narrator consents to the strange fellow’s request. They soon become friends and the Little Prince informs the pilot that he is from a small planet, the asteroid 325, talks to him about the baobabs, his planet volcanoes and the mysterious rose that grew on his planet. He also talks to him about their friendship and the lie that evoked his journey to other planets. Often puzzled by the grown-ups’ behavior, the little traveler becomes a total and eternal symbol of innocence and love, of responsibility and devotion. Through him we get to see how insightful children are and how grown-ups aren’t. Children use their heart to feel what’s really important, not the eyes. Heart-breaking, funny and thought-provoking, it is an enchanting and endlessly wise fable about the human condition and the power of imagination. A book about both childhood and adulthood, it can be read as a parable, a war story, a classic children's fairy-tale, and many more things besides: The Little Prince is a book for everyone; after all, all grown-ups were children once.",
    }),
    Product.create({
      name: "The Art of Fielding",
      price: 17.99,
      author: "Chad Harbach",
      categoryId: generalFiction.id,
      isbn: "9780316192163",
      thumbUrl:
        "http://books.google.com/books/content?id=65p0FWFyFR4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "At Westish College, a small school on the shore of Lake Michigan, baseball star Henry Skrimshander seems destined for big league stardom. But when a routine throw goes disastrously off course, the fates of five people are upended. Henry's fight against self-doubt threatens to ruin his future. College president Guert Affenlight, a longtime bachelor, has fallen unexpectedly and helplessly in love. Owen Dunne, Henry's gay roommate and teammate, becomes caught up in a dangerous affair. Mike Schwartz, the Harpooners' team captain and Henry's best friend, realizes he has guided Henry's career at the expense of his own. And Pella Affenlight, Guert's daughter, returns to Westish after escaping an ill-fated marriage, determined to start a new life. As the season counts down to its climactic final game, these five are forced to confront their deepest hopes, anxieties, and secrets. In the process they forge new bonds, and help one another find their true paths. Written with boundless intelligence and filled with the tenderness of youth, The Art of Fielding is an expansive, warmhearted novel about ambition and its limits, about family and friendship and love, and about commitment--to oneself and to others.",
    }),
    Product.create({
      name: "A Brief History of Time",
      price: 15.99,
      author: "Stephen Hawking",
      categoryId: sciAndComp.id,
      isbn: "9780553385465",
      thumbUrl:
        "http://books.google.com/books/content?id=DiBjCUibQo4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A shorter, more accessible edition of a now-classic survey of the origin and nature of the universe features new full-color illustrations and an expanded, easier to understand treatment of the volume's more important theoretical concepts.",
    }),
    Product.create({
      name: "Year of Yes",
      price: 18.99,
      author: "Shonda Rhimes",
      categoryId: biography.id,
      isbn: "9781476777092",
      thumbUrl:
        "http://books.google.com/books/content?id=RI3qCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The creator of /'Grey/'s Anatomy/' and /'Scandal/' details the one-year experiment with saying /'yes/' that transformed her life, revealing how accepting unexpected invitations she would have otherwise declined enabled powerful benefits.",
    }),
    Product.create({
      name: "How to be a Person in the World",
      price: 12.99,
      author: "Heather Havrilesky",
      categoryId: nonfiction.id,
      isbn: "9781101911587",
      thumbUrl:
        "http://books.google.com/books/content?id=oxInDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A New York Times Love and Relationships Bestseller A hilarious, frank, and witty collection of all-new responses, plus a few greatest hits, from the author of the beloved advice column /'Ask Polly/' in New York magazine's The Cut. Should you quit your day job to follow your dreams? How do you rein in an overbearing mother? Will you ever stop dating wishy-washy, noncommittal guys? Should you put off having a baby for your career? Heather Havrilesky of the wildly popular Ask Polly advice column is here to guide you through the /'what if/'s/' and /'I don/'t knows/' of modern life with the signature wisdom and tough love her readers have come to expect. How to Be a Person in the World is a hilarious, frank, and witty collection of never-before-published material along with a few fan favorites. Whether she's responding to cheaters or loners, lovers or haters, the anxious or the down-and-out, Havrilesky writes with equal parts grace, humor, and compassion to remind you that even in your darkest moments you're not alone.",
    }),
    Product.create({
      name: "An American Marriage",
      price: 13.99,
      author: "Tayari Jones",
      categoryId: generalFiction.id,
      isbn: "9781616207601",
      thumbUrl:
        "http://books.google.com/books/content?id=fc8PDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "LONGLISTED FOR THE ORWELL PRIZE FOR POLITICAL FICTION, 2019 SHORTLISTED FOR THE INTERNATIONAL DUBLIN LITERARY AWARD 'A moving portrayal of the effects of a wrongful conviction on a young African-American couple.' - Barack Obama A Book of the Year according the i, Guardian, Sunday Times, Sunday Mail Newlyweds Celestial and Roy are the embodiment of the American Dream. He is a young executive, and she is an artist on the brink of an exciting career. Until one day they are ripped apart by circumstances neither could have imagined. Roy is arrested and sentenced to twelve years for a crime Celestial knows he didn't commit. Devastated and unmoored, Celestial finds herself struggling to hold on to the love that has been her centre, taking comfort in Andre, their closest friend. When Roy's conviction is suddenly overturned, he returns home ready to resume their life together. A masterpiece of storytelling, An American Marriage offers a profoundly insightful look into the hearts and minds of three unforgettable characters who are at once bound together and separated by forces beyond their control.",
    }),
    Product.create({
      name: "Elanor Oliphant is Comepletely Fine",
      price: 14.99,
      author: "Gail Honeyman",
      categoryId: generalFiction.id,
      isbn: "9780735242098",
      thumbUrl:
        "http://books.google.com/books/content?id=8CcozgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "#1 NEW YORK TIMES BESTSELLER A REESE WITHERSPOON x HELLO SUNSHINE BOOK CLUB PICK A PENGUIN BOOK CLUB PICK /'Beautifully written and incredibly funny. . . I fell in love with Eleanor; I think you will fall in love, too!/' --Reese Witherspoon Smart, warm, uplifting, the story of an out-of-the-ordinary heroine whose deadpan weirdness and unconscious wit make for an irresistible journey as she realizes the only way to survive is to open her heart. No one's ever told Eleanor that life should be better than fine. Meet Eleanor Oliphant: She struggles with appropriate social skills and tends to say exactly what she's thinking. Nothing is missing in her carefully timetabled life of avoiding social interactions, where weekends are punctuated by frozen pizza, vodka, and phone chats with Mummy. But everything changes when Eleanor meets Raymond, the bumbling and deeply unhygienic IT guy from her office. When she and Raymond together save Sammy, an elderly gentleman who has fallen on the sidewalk, the three become the kinds of friends who rescue one another from the lives of isolation they have each been living. And it is Raymond's big heart that will ultimately help Eleanor find the way to repair her own profoundly damaged one.",
    }),
    Product.create({
      name: "Cook This Book",
      price: 21.99,
      author: "Molly Baz",
      categoryId: cooking.id,
      isbn: "9780593138274",
      thumbUrl:
        "http://books.google.com/books/content?id=8UUlEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A new kind of foundational cookbook, this thoroughly modern guide to becoming a smarter, faster, more creative cook serves up clear and uncomplicated recipes that make cooking fun and will inspire a new generation to find joy in the kitchen.",
    }),
    Product.create({
      name: "Dessert Person",
      price: 23.99,
      author: "Claire Saffitz",
      categoryId: cooking.id,
      isbn: "9781984826961",
      thumbUrl:
        "http://books.google.com/books/content?id=IBYAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Claire Saffitz is a baking hero for a new generation. In Dessert Person, fans will find Claire's signature spin on sweet and savory recipes like Babkallah (a babka-Challah mashup), Apple and Concord Grape Crumble Pie, Strawberry-Cornmeal Layer Cake, Crispy Mushroom Galette, and Malted Forever Brownies. She outlines the problems and solutions for each recipe--like what to do if your pie dough for Sour Cherry Pie cracks (patch it with dough or a quiche flour paste!)--as well as practical do's and don'ts, skill level, prep and bake time, and foundational know-how. With Claire at your side, everyone can be a dessert person.",
    }),
    Product.create({
      name: "Fun Home",
      price: 13.99,
      author: "Alison Bechdel",
      categoryId: graphicNovelManga.id,
      isbn: "9780618871711",
      thumbUrl:
        "http://books.google.com/books/content?id=eq0n9Ck79ysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A memoir done in the form of a graphic novel by a cult favorite comic artist offers a darkly funny family portrait that details her relationship with her father--a funeral home director, high school English teacher, and closeted homosexual.",
    }),
    Product.create({
      name: "The Watchmen",
      price: 16.99,
      author: "Alan Moore",
      categoryId: graphicNovelManga.id,
      isbn: "9781497679245",
      thumbUrl:
        "http://books.google.com/books/content?id=SoSpBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "In a CIA safe house, a reluctant interrogator and his subject find that they are the next targets on a ruthless assassin’s hit list Psychiatrist Louis Finney is still haunted by nightmares stemming from the work in mind control and psychological conditioning he helped to pioneer for the US government years ago. But when he is asked by his dying mentor to help with the questioning of Ali Zattout, an al-Qaeda operative, Finney finds he cannot refuse. Charismatic, intelligent, and unexpectedly cooperative, Zattout possesses information his masters in the Middle East cannot allow him to reveal. As Finney tries to determine if the terrorist is telling the truth or spinning a web of lies, a relentless killer closes in on the secret location where the two men are trapped together. Too late, Finney realizes that he is a pawn in a conspiracy whose dimensions stretch deep into the corridors of power. A provocative suspense story that peers into the dark corners of the war on terror, John Altman’s The Watchmen depicts the murky world of twenty-first-century espionage with thrilling style and fascinating psychological depth.",
    }),
    Product.create({
      name: "Maus 1: A Surivor's Tale: My Father Bleeds History",
      price: 14.99,
      author: "Art Spiegelman",
      categoryId: graphicNovelManga.id,
      isbn: "9780394747231",
      thumbUrl:
        "http://books.google.com/books/content?id=1fYEwgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "The author-illustrator traces his father's imprisonment in a Nazi concentration camp through a series of disarming and unusual cartoons arranged to tell the story as a novel.",
    }),
    Product.create({
      name: "Maus 2: A Surivor's Tale: Here My Troubles Began",
      price: 15.99,
      author: "Art Spiegelman",
      categoryId: graphicNovelManga.id,
      isbn: "9780679729778",
      thumbUrl:
        "http://books.google.com/books/content?id=am2PXS60sy8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "In a comic-book-style tale of the author's parents, Vladek and Anja, Vladek survives Auschwitz, is reunited with Anja, and sires young Art",
    }),
    Product.create({
      name: "Death Note Complete Box Set: Volumes 1-13",
      price: 295.99,
      author: "Tsugumi Ohba",
      categoryId: graphicNovelManga.id,
      isbn: "9781421597713",
      thumbUrl:
        "http://books.google.com/books/content?id=ZRHVAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "All 12 volumes of Death Note in one monstrously large edition! This hefty omnibus combines all 2,400 pages of the megahit thriller into a single massive tome, presented in a beautiful silver slipcase. A perfect collectible conversation piece and a must-have for Death Note fans. Also contains an epilogue chapter never before seen in English! Light Yagami is an ace student with great prospects—and he's bored out of his mind. But all that changes when he finds the Death Note, a notebook dropped by a rogue Shinigami death god. Any human whose name is written in the notebook dies, and now Light has vowed to use the power of the Death Note to rid the world of evil. But when criminals begin dropping dead, the authorities send the legendary detective L to track down the killer. With L hot on his heels, will Light lose sight of his noble goal…or his life?",
    }),
    Product.create({
      name: "The Gifts of Imperfection",
      price: 14.99,
      author: "Brene Brown, Ph.D., L.M.S.W.",
      categoryId: selfHelp.id,
      isbn: "9781592858491",
      thumbUrl:
        "http://books.google.com/books/content?id=5DT91ar7MwkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "An expert of the psychology of shame presents advice on how to overcome paralyzing fears and self-consciousness, and at the same time increase feelings of self-worth, gratitude, and acceptance.",
    }),
    Product.create({
      name: "The Mothers",
      price: 16.99,
      author: "Brit Bennett",
      categoryId: generalFiction.id,
      isbn: "9780063042070",
      thumbUrl:
        "http://books.google.com/books/content?id=8n32DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "/'Like all my favorite books, The Mothers is both heartbreaking and heartwarming, and it leaves you with a lot to think about after you turn the final page. I sobbed my way through this wonderful book./' -Sally Hepworth, New York Times bestselling author of The Good Sister What if you gave birth to someone else’s child? An emotional family drama about two couples, one baby, and an unimaginable choice. Inspired by a real-life case of an IVF laboratory mix-up. Grace and Dan Arden are in their forties and have been on the IVF treadmill since the day they got married. Six attempts have yielded no results, and with each failure a little piece of their hope dies. Priya Laghari and her husband Nick Archer are being treated at the same fertility clinic, and while they don’t face the same time pressure as the Ardens, the younger couple have their own problems. On the same day that Priya is booked for her next IVF cycle, Grace goes in for her final, last-chance embryo transfer. Two weeks later, both women get their results. A year on, angry and heartbroken, one of the women learns her embryo was implanted in the other’s uterus and must make a devastating choice: live a childless life knowing her son is being raised by strangers or seek custody of a baby who has been nurtured and loved by another couple.",
    }),
    Product.create({
      name: "A Short History of Nearly Everything",
      price: 13.99,
      author: "Bill Bryson",
      categoryId: nonfiction.id,
      isbn: "9780385674508",
      thumbUrl:
        "http://books.google.com/books/content?id=_CWlKRYLbIwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "One of the world’s most beloved and bestselling writers takes his ultimate journey -- into the most intriguing and intractable questions that science seeks to answer. In A Walk in the Woods, Bill Bryson trekked the Appalachian Trail -- well, most of it. In In A Sunburned Country, he confronted some of the most lethal wildlife Australia has to offer. Now, in his biggest book, he confronts his greatest challenge: to understand -- and, if possible, answer -- the oldest, biggest questions we have posed about the universe and ourselves. Taking as territory everything from the Big Bang to the rise of civilization, Bryson seeks to understand how we got from there being nothing at all to there being us. To that end, he has attached himself to a host of the world’s most advanced (and often obsessed) archaeologists, anthropologists, and mathematicians, travelling to their offices, laboratories, and field camps. He has read (or tried to read) their books, pestered them with questions, apprenticed himself to their powerful minds. A Short History of Nearly Everything is the record of this quest, and it is a sometimes profound, sometimes funny, and always supremely clear and entertaining adventure in the realms of human knowledge, as only Bill Bryson can render it. Science has never been more involving or entertaining.",
    }),
    Product.create({
      name: "The Nightingale",
      price: 17.99,
      author: "Kristin Hannah",
      categoryId: historicalFiction.id,
      isbn: "9781628995015",
      thumbUrl:
        "http://books.google.com/books/content?id=vr4JrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "In World War II France, two sisters face frightening situations and respond in ways they never thought possible as bravery and resistance take different forms in each of their actions",
    }),
    Product.create({
      name: "The Great Alone",
      price: 18.99,
      author: "Kristin Hannah",
      categoryId: historicalFiction.id,
      isbn: "9781250165619",
      thumbUrl:
        "http://books.google.com/books/content?id=LRekDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "In Kristin Hannah’s The Great Alone, a desperate family seeks a new beginning in the near-isolated wilderness of Alaska only to find that their unpredictable environment is less threatening than the erratic behavior found in human nature. #1 New York Times Instant Bestseller (February 2018) A People “Book of the Week” Buzzfeed’s “Most Anticipated Women’s Fiction Reads of 2018” Seattle Times’s “Books to Look Forward to in 2018” Alaska, 1974. Ernt Allbright came home from the Vietnam War a changed and volatile man. When he loses yet another job, he makes the impulsive decision to move his wife and daughter north where they will live off the grid in America’s last true frontier. Cora will do anything for the man she loves, even if means following him into the unknown. Thirteen-year-old Leni, caught in the riptide of her parents’ passionate, stormy relationship, has little choice but to go along, daring to hope this new land promises her family a better future. In a wild, remote corner of Alaska, the Allbrights find a fiercely independent community of strong men and even stronger women. The long, sunlit days and the generosity of the locals make up for the newcomers’ lack of preparation and dwindling resources. But as winter approaches and darkness descends, Ernt’s fragile mental state deteriorates. Soon the perils outside pale in comparison to threats from within. In their small cabin, covered in snow, blanketed in eighteen hours of night, Leni and her mother learn the terrible truth: they are on their own.",
    }),
    Product.create({
      name: "Cat's Cradle",
      price: 15.99,
      author: "Kurt Vonnegut",
      categoryId: generalFiction.id,
      isbn: "9780307567277",
      thumbUrl:
        "http://books.google.com/books/content?id=w25sx0G6nRsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "“A free-wheeling vehicle . . . an unforgettable ride!”—The New York Times Cat’s Cradle is Kurt Vonnegut’s satirical commentary on modern man and his madness. An apocalyptic tale of this planet’s ultimate fate, it features a midget as the protagonist, a complete, original theology created by a calypso singer, and a vision of the future that is at once blackly fatalistic and hilariously funny. A book that left an indelible mark on an entire generation of readers, Cat’s Cradle is one of the twentieth century’s most important works—and Vonnegut at his very best. “[Vonnegut is] an unimitative and inimitable social satirist.”—Harper’s Magazine “Our finest black-humorist . . . We laugh in self-defense.”—Atlantic Monthly",
    }),
    Product.create({
      name: "Breakfast of Champions",
      price: 16.99,
      author: "Kurt Vonnegut",
      categoryId: generalFiction.id,
      isbn: "9781407054032",
      thumbUrl:
        "http://books.google.com/books/content?id=TQnjC11EIJ8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "Discover Vonnegurt’s funny absurdist novel about the human condition. ‘Outrageous, witty, thought-provoking, unputdownable, scintillating, invigorating, ennobling, enlightening and masterly’ Spectator In a frolic of cartoon and comic outbursts against rule and reason, a miraculous weaving of science fiction, memoir, parable, fairy tale and farce, Kurt Vonnegut attacks the whole spectrum of American society, releasing some of his best-loved literary creations on the scene. ‘Vonnegut explains everything from an apple to the pyramids...weird, fast and inventive’ Daily Telegraph",
    }),
    Product.create({
      name: "Slaughterhouse-Five",
      price: 18.99,
      author: "Kurt Vonnegut",
      categoryId: generalFiction.id,
      isbn: "9780440180296",
      thumbUrl:
        "http://books.google.com/books/content?id=gFSHD40Y320C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Billy Pilgrim survives capture by the Gemans in World War II, the Dresden bombings, and the struggle for financial success only to be kidnapped in a flying saucer and taken to the planet Tralfamadore.",
    }),
    Product.create({
      name: "A Little Life",
      price: 20.99,
      author: "Hanya Yanagihara",
      categoryId: generalFiction.id,
      isbn: "9780385539265",
      thumbUrl:
        "http://books.google.com/books/content?id=Lf99BAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "NATIONAL BESTSELLER • A stunning “portrait of the enduring grace of friendship” (NPR) about the families we are born into, and those that we make for ourselves. A masterful depiction of love in the twenty-first century. A NATIONAL BOOK AWARD FINALIST • A MAN BOOKER PRIZE FINALIST • WINNER OF THE KIRKUS PRIZE A Little Life follows four college classmates—broke, adrift, and buoyed only by their friendship and ambition—as they move to New York in search of fame and fortune. While their relationships, which are tinged by addiction, success, and pride, deepen over the decades, the men are held together by their devotion to the brilliant, enigmatic Jude, a man scarred by an unspeakable childhood trauma. A hymn to brotherly bonds and a masterful depiction of love in the twenty-first century, Hanya Yanagihara’s stunning novel is about the families we are born into, and those that we make for ourselves. Look for Hanya Yanagihara’s new novel, To Paradise, coming in January 2022.",
    }),
    Product.create({
      name: "To Paradise",
      price: 19.99,
      author: "Hanya Yanagihara",
      categoryId: generalFiction.id,
      isbn: "9780385547949",
      thumbUrl:
        "http://books.google.com/books/content?id=WN4nEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "From the author of the classic A Little Life—a bold, brilliant novel spanning three centuries and three different versions of the American experiment, about lovers, family, loss and the elusive promise of utopia. In an alternate version of 1893 America, New York is part of the Free States, where people may live and love whomever they please (or so it seems). The fragile young scion of a distinguished family resists betrothal to a worthy suitor, drawn to a charming music teacher of no means. In a 1993 Manhattan besieged by the AIDS epidemic, a young Hawaiian man lives with his much older, wealthier partner, hiding his troubled childhood and the fate of his father. And in 2093, in a world riven by plagues and governed by totalitarian rule, a powerful scientist’s damaged granddaughter tries to navigate life without him—and solve the mystery of her husband’s disappearances. These three sections are joined in an enthralling and ingenious symphony, as recurring notes and themes deepen and enrich one another: A townhouse in Washington Square Park in Greenwich Village; illness, and treatments that come at a terrible cost; wealth and squalor; the weak and the strong; race; the definition of family, and of nationhood; the dangerous righteousness of the powerful, and of revolutionaries; the longing to find a place in an earthly paradise, and the gradual realization that it can’t exist. What unites not just the characters, but these Americas, are their reckonings with the qualities that make us human: Fear. Love. Shame. Need. Loneliness. To Paradise is a fin de siecle novel of marvelous literary effect, but above all it is a work of emotional genius. The great power of this remarkable novel is driven by Yanagihara’s understanding of the aching desire to protect those we love—partners, lovers, children, friends, family and even our fellow citizens—and the pain that ensues when we cannot.",
    }),
    Product.create({
      name: "Clash of Kings",
      price: 18.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
      isbn: "9780345535429",
      thumbUrl:
        "http://books.google.com/books/content?id=v7eWDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Five separate factions vie for control of the realm of the late Lord Eddard Stark, while an ancient form of magic, an everlasting winter, and an unearthly army threaten to return, in a classic fantasy novel being adapted for TV as Season 2 of the HBO series A Game of Thrones. Reissue. TV tie-in.",
    }),
    Product.create({
      name: "A Game of Thrones",
      price: 17.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
      isbn: "9780553593716",
      thumbUrl:
        "http://books.google.com/books/content?id=YDzTCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The kingdom of the royal Stark family faces its ultimate challenge in the onset of a generation-long winter, the poisonous plots of the rival Lannisters, the emergence of the Neverborn demons and the arrival of barbarian hordes. Reissue. TV tie-in.",
    }),
    Product.create({
      name: "A Storm of Swords",
      price: 19.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
      isbn: "9780345543974",
      thumbUrl:
        "http://books.google.com/books/content?id=1CVcu9TpO5gC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The three surviving contenders for the throne of the Seven Kingdoms continue to struggle among themselves, Robb defends his kingdom from the Greyjoys, Jon confronts an escalating threat, and Daenerys and her dragon allies continue to grow in power.",
    }),
    Product.create({
      name: "A Feast for Crows",
      price: 16.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
      isbn: "9780553390568",
      thumbUrl:
        "http://books.google.com/books/content?id=fdSJDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "The uneasy peace that exists following the death of Robb Stark is threatened by new plots, intrigues, and alliances that once again will plunge the Seven Kingdoms into all-out war for control of the Iron Throne.",
    }),
    Product.create({
      name: "A Dance with Dragons",
      price: 19.99,
      author: "George R.R. Martin",
      categoryId: fantasy.id,
      isbn: "9781101886038",
      thumbUrl:
        "http://books.google.com/books/content?id=uPqLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "New threats emerge to endanger the future of the Seven Kingdoms, as Daenerys Targaryen, ruling in the East, fights off a multitude of enemies, while Jon Snow, Lord Commander of the Night's Watch, faces his foes both in the Watch and beyond the great Wallof ice and stone.",
    }),
    Product.create({
      name: "Harry Potter and the Chamber of Secrets",
      price: 12.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
      isbn: "9781781100509",
      thumbUrl:
        "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "'There is a plot, Harry Potter. A plot to make most terrible things happen at Hogwarts School of Witchcraft and Wizardry this year.' Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone... Dobby's sinister predictions seem to be coming true. Having now become classics of our time, the Harry Potter ebooks never fail to bring comfort and escapism to readers of all ages. With its message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.",
    }),
    Product.create({
      name: "Harry Potter and the Prisoner of Azkaban",
      price: 13.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
      isbn: "9781781100516",
      thumbUrl:
        "http://books.google.com/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "'Welcome to the Knight Bus, emergency transport for the stranded witch or wizard. Just stick out your wand hand, step on board and we can take you anywhere you want to go.' When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves... But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss... Having now become classics of our time, the Harry Potter ebooks never fail to bring comfort and escapism to readers of all ages. With its message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.",
    }),
    Product.create({
      name: "Harry Potter and the Goblet of Fire",
      price: 15.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
      isbn: "9781594130038",
      thumbUrl:
        "http://books.google.com/books/content?id=6mcSnwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "Fourteen-year-old Harry Potter joins the Weasleys at the Quidditch World Cup, then enters his fourth year at Hogwarts Academy where he is mysteriously entered in an unusual contest that challenges his wizarding skills, friendships and character, amid signs that an old enemy is growing stronger.Fourteen-year-old Harry Potter joins the Weasleys at the Quidditch World Cup, then enters his fourth year at Hogwarts Academy where he is mysteriously entered in an unusual contest that challenges his wizarding skills, friendships and character, amid signs that an old enemy is growing stronger.",
    }),
    Product.create({
      name: "Harry Potter and the Order of the Phoenix",
      price: 16.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
      isbn: "9781338299182",
      thumbUrl:
        "http://books.google.com/books/content?id=qxdnswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "A special new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer's Stone, with a stunning new cover illustration by Caldecott Medalist Brian Selznick. There is a door at the end of a silent corridor. And it's haunting Harry Potter's dreams. Why else would he be waking in the middle of the night, screaming in terror? It's not just the upcoming O.W.L. exams; a new teacher with a personality like poisoned honey; a venomous, disgruntled house-elf; or even the growing threat of He-Who-Must-Not-Be-Named. Now Harry Potter is faced with the unreliability of the very government of the magical world and the impotence of the authorities at Hogwarts. Despite this (or perhaps because of it), he finds depth and strength in his friends, beyond what even he knew; boundless loyalty; and unbearable sacrifice. This gorgeous new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer's Stone features a newly designed cover illustrated by Caldecott Medalist Brian Selznick, as well as the beloved original interior decorations by Mary GrandPré.",
    }),
    Product.create({
      name: "Harry Potter and the Deathly Gallows",
      price: 17.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
      isbn: "9780606323512",
      thumbUrl:
        "http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "The seventh and final book of the blockbuster Harry Potter series follows the wizard's last year at Hogwarts School of Witchcraft and Wizardry. 12,000,000 first printing.",
    }),
    Product.create({
      name: "Harry Potter and the Half Blood Prince",
      price: 15.99,
      author: "J.K. Rowling",
      categoryId: childrensLit.id,
      isbn: "9780439784542",
      thumbUrl:
        "http://books.google.com/books/content?id=L2EQuwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "As Harry enters his sixth year at Hogwarts, a storm is brewing in the battle between good and evil, a battle that promises to have incredible consequences for the magic world.",
    }),
    Product.create({
      name: "Beautiful World, Where Are You",
      price: 16.99,
      author: "Sally Rooney",
      categoryId: generalFiction.id,
      isbn: "9780374602611",
      thumbUrl:
        "http://books.google.com/books/content?id=sL4SEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "AN INSTANT #1 NEW YORK TIMES BESTSELLER Beautiful World, Where Are You is a new novel by Sally Rooney, the bestselling author of Normal People and Conversations with Friends. Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up, and slips back into flirting with Simon, a man she has known since childhood. Alice, Felix, Eileen, and Simon are still young—but life is catching up with them. They desire each other, they delude each other, they get together, they break apart. They have sex, they worry about sex, they worry about their friendships and the world they live in. Are they standing in the last lighted room before the darkness, bearing witness to something? Will they find a way to believe in a beautiful world?",
    }),
    Product.create({
      name: "Normal People",
      price: 15.99,
      author: "Sally Rooney",
      categoryId: generalFiction.id,
      isbn: "9780571334650",
      thumbUrl:
        "http://books.google.com/books/content?id=bhSougEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there. In school, Connell is popular and well-liked, while Marianne is a loner. But when the two strike up a conversation - awkward but electrifying - something life-changing begins. Normal People is a story of mutual fascination, friendship and love. It takes us from that first conversation to the years beyond, in the company of two people who try to stay apart but find they can't.",
    }),
    Product.create({
      name: "The Book on Pie",
      price: 19.99,
      author: "Erin Jeanne McDowell",
      categoryId: cooking.id,
      isbn: "9780358229285",
      thumbUrl:
        "http://books.google.com/books/content?id=S_zIDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Erin Jeanne McDowell, New York Times contributing baker extraordinaire and top food stylist, wrote the book on pie, a comprehensive handbook that distills all you'll ever need to know for making perfect pies. The Book on Pie starts with the basics, including techniques, conversions, make-aheads, and styling tricks, before diving into 100 of her unique and intriguing recipes. Find everything from classics like apple and pumpkin, to more inspired recipes like Hand-Pie Ice Cream Sandwiches and Chinese BBQ Pork and Scallion Pie. Erin takes every recipe a step further with Pie-deas: ideas for swapping doughs, crusts, and toppings for infinitely customizable pies. Mix and match Pumpkin Spice Pie Dough and Dark Chocolate Drippy Glaze, or the Chive Compound-Butter Crust with the Croque Madame Pielets . . . the possibilities are endless. Look no further than The Book on Pie for the only book on pie you/'ll ever want or need.",
    }),
    Product.create({
      name: "Salt Fat Acid Heat",
      price: 16.99,
      author: "Samin Nosrat",
      categoryId: cooking.id,
      isbn: "9781476753836",
      thumbUrl:
        "http://books.google.com/books/content?id=yvqxDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Whether you've never picked up a knife or you're an accomplished chef, there are only four basic factors that determine how good your food will taste. Salt, Fat, Acid, and Heat are the four cardinal directions of cooking, and they will guide you as you choose which ingredients to use and how to cook them, and they will tell you why last minute adjustments will ensure that food tastes exactly as it should. This book will change the way you think about cooking and eating, and help you find your bearings in any kitchen, with any ingredients, while cooking any meal.",
    }),
    Product.create({
      name: "Final Girls",
      price: 14.99,
      author: "Riley Sager",
      categoryId: mysteryThrill.id,
      isbn: "9780593187173",
      thumbUrl:
        "http://books.google.com/books/content?id=3KVPEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "THE NATIONAL AND INTERNATIONAL BESTSELLER “If you liked Gone Girl, you’ll like this.”—Stephen King Ten years ago, six friends went on vacation. One made it out alive…. In that instant, college student Quincy Carpenter became a member of a very exclusive club—a group of survivors the press dubbed “The Final Girls”: Lisa, who lost nine sorority sisters to a college dropout's knife; Sam, who endured the Sack Man during her shift at the Nightlight Inn; and now Quincy, who ran bleeding through the woods to escape the massacre at Pine Cottage. Despite the media's attempts, the three girls have never met. Now, Quincy is doing well—maybe even great, thanks to her Xanax prescription. She has a caring almost-fiancé; a popular baking blog; a beautiful apartment; and a therapeutic presence in Coop, the police officer who saved her life. Her mind won’t let her recall the events of that night; the past is in the past…until the first Final Girl is found dead in her bathtub and the second Final Girl appears on Quincy's doorstep. Blowing through Quincy's life like a hurricane, Sam seems intent on making her relive the trauma of her ordeal. When disturbing details about Lisa's death emerge, Quincy desperately tries to unravel Sam's truths from her lies while evading both the police and bloodthirsty reporters. Quincy knows that in order to survive she has to remember what really happened at Pine Cottage. Because the only thing worse than being a Final Girl is being a dead one. WINNER OF THE 2018 INTERNATIONAL THRILLER WRITERS AWARD FOR BEST HARDCOVER NOVEL",
    }),
    Product.create({
      name: "Recursion",
      price: 18.99,
      author: "Blake Crouch",
      categoryId: scienceFiction.id,
      isbn: "9781524759797",
      thumbUrl:
        "http://books.google.com/books/content?id=A2bRDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Investigating a suicide, New York City police officer Barry Sutton finds a connection to the outbreak of a memory-altering disease and a controversial neuroscientist working to preserve precious memories",
    }),
    Product.create({
      name: "Dark Matter",
      price: 17.99,
      author: "Blake Crouch",
      categoryId: scienceFiction.id,
      isbn: "9781101904237",
      thumbUrl:
        "http://books.google.com/books/content?id=85nrCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "A mindbending, relentlessly surprising thriller from the author of the bestselling Wayward Pines trilogy. “Are you happy with your life?” Those are the last words Jason Dessen hears before the masked abductor knocks him unconscious. Before he awakens to find himself strapped to a gurney, surrounded by strangers in hazmat suits. Before a man Jason’s never met smiles down at him and says, “Welcome back, my friend.” In this world he’s woken up to, Jason’s life is not the one he knows. His wife is not his wife. His son was never born. And Jason is not an ordinary college physics professor, but a celebrated genius who has achieved something remarkable. Something impossible. Is it this world or the other that’s the dream? And even if the home he remembers is real, how can Jason possibly make it back to the family he loves? The answers lie in a journey more wondrous and horrifying than anything he could’ve imagined—one that will force him to confront the darkest parts of himself even as he battles a terrifying, seemingly unbeatable foe. Dark Matter is a brilliantly plotted tale that is at once sweeping and intimate, mind-bendingly strange and profoundly human—a relentlessly surprising science-fiction thriller about choices, paths not taken, and how far we’ll go to claim the lives we dream of.",
    }),
    Product.create({
      name: "The Forever War",
      price: 11.99,
      author: "Joe Haldeman",
      categoryId: scienceFiction.id,
      isbn: "9780312536633",
      thumbUrl:
        "http://books.google.com/books/content?id=l4lxLsH2n3YC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        " Battling the Taurans in space was one problem as Private William Mandella worked his way up the ranks to major. In spanning the stars, he aged only months while Earth aged centuries.",
    }),
    Product.create({
      name: "Things Fall Apart",
      price: 10.99,
      author: "Chinua Achebe",
      categoryId: worldLit.id,
      isbn: "9780141393964",
      thumbUrl:
        "http://books.google.com/books/content?id=tSbWMu_-D5AC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      description:
        "Okonkwo is the greatest warrior alive, famous throughout West Africa. But when he accidentally kills a clansman, things begin to fall apart. Then Okonkwo returns from exile to find missionaries and colonial governors have arrived in the village. With his world thrown radically off-balance he can only hurtle towards tragedy. Chinua Achebe's stark novel reshaped both African and world literature. This arresting parable of a proud but powerless man witnessing the ruin of his people begins Achebe's landmark trilogy of works chronicling the fate of one African community, continued in Arrow of God and No Longer at Ease.",
    }),
    Product.create({
      name: "The Kite Runner",
      price: 14.99,
      author: "Khaled Hosseini",
      categoryId: worldLit.id,
      isbn: "9781400025466",
      thumbUrl:
        "http://books.google.com/books/content?id=kHxZ0csseZEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      description:
        "An epic tale of fathers and sons, of friendship and betrayal, that takes us from Afghanistan in the final days of the monarchy to the atrocities of the present. The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father's servant, The Kite Runner is a beautifully crafted novel set in a country that is in the process of being destroyed. It is about the power of reading, the price of betrayal, and the possibility of redemption, and it is also about the power of fathers over sons-their love, their sacrifices, their lies.",
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
