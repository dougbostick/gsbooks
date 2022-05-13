import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProduct } from "../store/products";
import { addCartItem } from "../store/cart-item";
import { addGuestCartItem } from "./AddGuestCartItem";
import AddProduct from "./AddProduct";
import Searchbar from "./Searchbar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    marginLeft: "1.5rem",
  },

  media: {
    height: 275,
  },

  product: {
    margin: "1rem 1rem",
    maxWidth: 500,
    minHeight: 450,
    maxHeight: 450,
    "&:hover": {
      boxShadow: "5px 8px #FF6363",
    },
    background: "#FAF5E4",
  },

  info: {
    display: "flex",
    direction: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const Category = (props) => {
  const classes = useStyles();
  const { isAdmin, remove, addCartItem, products, category } = props;
  const books = products.map((book) => {
    return (
      <Grid item key={book.id} xs={3}>
        <Link to={`/products/${book.id}`}>
          <Card className={classes.product}>
            <CardActionArea>
              <CardContent>
                <CardMedia
                  className={classes.media}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to={`/products/${book.id}`}>
                    <img src={book.thumbUrl} style={{ height: "200px" }} />
                  </Link>
                </CardMedia>

                <div className={classes.info}>
                  <Typography variant="h5">
                    <Link to={`/products/${book.id}`}>
                      {book.name.length > 30
                        ? book.name.slice(0, 30) + "..."
                        : book.name}
                    </Link>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "1.3rem" }}
                  >
                    ${book.price}
                  </Typography>
                </div>

                <Typography variant="subtitle2" style={{ marginTop: "0.5rem" }}>
                  {book.author}
                </Typography>
              </CardContent>
              <Button
                onClick={() =>
                  props.isLoggedin.id
                    ? addCartItem(book, 1)
                    : addGuestCartItem(book, 1)
                }
                size="small"
                style={{
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "grey",
                  padding: "0.5rem",
                }}
              >
                {" "}
                Add to Cart{" "}
              </Button>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    );
  });

  return (
    <>
      <h3 className={classes.title}> {category} </h3>;
      <Grid container spacing={2}>
        {books}
      </Grid>
    </>
  );
};

const mapStateToProps = (state, { match }) => {
  return {
    category: state.categories
      .filter((category) => category.id === match.params.id * 1)
      .map((category) => category.name)
      .join(""),
    products: state.products.filter(
      (product) => product.categoryId === match.params.id * 1
    ),
    isAdmin: state.auth.admin,
    isLoggedin: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (book, quantity) => dispatch(addCartItem(book, quantity)),
    remove: async (product) => {
      await dispatch(deleteProduct(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
