const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

//product route

const Product = require("./db/models/Product");

app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log("/api/produtcs", products);
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

// app.get("/api/products/:id", async (req, res, next) => {
//   try {
//     const book = await Product.findByPk(req.params.id);
//     console.log("/api/products/:id", book);
//     res.send(book);
//   } catch (ex) {
//     next(ex);
//   }
// });
