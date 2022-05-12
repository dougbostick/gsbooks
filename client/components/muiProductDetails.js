import React from "react";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { addCartItem } from "../store/cart-item";
import { updateProduct } from "../store/products";
import UpdateProduct from "./UpdateProduct";
import { addGuestCartItem } from "./AddGuestCartItem";
import DescApi from "./DescApi";
import ISBNApi from "./ISBNApi";
import ImgApi from "./ImgApi";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    margin: "18px",
  },
  main: {
    display: "flex",
    justifyContent: "center",
  },
});

function MuiProductDetails(props) {
  const { addCartItem, book, isAdmin, categories } = props;
  console.log("props", props);
  const bookCategory = book
    ? categories
        .filter((category) => category.id === book.categoryId)
        .map((book) => book.name)
        .join("")
    : null;
  if (!book) {
    return null;
  }
  let quantity = 1;
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <ImgApi className={classes.media} book={book} />
      <Card className={classes.root}>
        <CardActionArea>
          {/* <ImgApi className={classes.media} book={book} /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {book.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h4">
              Author: <Link to={{ pathname: "/author", state: { author: book.author } }}>
               {book.author}
             </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <DescApi book={book} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ISBN: <ISBNApi book={book} />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              props.isLoggedin.id
                ? addCartItem(book, quantity)
                : addGuestCartItem(book, quantity * 1);
            }}
          >
            <select onChange={(ev) => (quantity = ev.target.value)}>
              {inventory.map((inv) => {
                return (
                  <option value={inv} key={inv}>
                    {inv}
                  </option>
                );
              })}
            </select>
            <button type="submit">Add to cart</button>
          </form>
        </CardActions>
      </Card>
    </div>
  );
}

const mapStateToProps = (state, { match }) => {
  return {
    isLoggedin: state.auth,
    isAdmin: state.auth.admin,
    products: state.products,
    categories: state.categories,
    book: state.products.find((book) => book.id === parseInt(match.params.id)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (book, quantity) => dispatch(addCartItem(book, quantity)),
    update: async (book) => await dispatch(updateProduct(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MuiProductDetails);
