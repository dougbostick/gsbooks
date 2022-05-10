import React from "react";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

function MuiProductDetails(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      // minHeight: "100vh",
      // backgroundImage: `url(${"/assets/bookcase4.jpeg"})`,
      // backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    box: {
      height: "5rem",
      width: "9rem",
      margin: "8px",
      textAlign: "center",

      // boxShadow: " 4px 4px 1px gray",
      fontWeight: "bold",
    },
  }));
  const classes = useStyles();
  console.log("props", props);
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

  return (
    <div className={classes.root}>
      <Box
        className={classes.box}
        component="div"
        my={2}
        whiteSpace="nowrap"
        bgcolor="background.paper"
      >
        {book.name}
      </Box>
      <Box>Category: {bookCategory}</Box>
      <Box
        className={classes.box}
        component="div"
        my={2}
        whiteSpace="normal"
        bgcolor="background.paper"
      >
        Author:{" "}
        {/* <Link to={{ pathname: "/author", state: { author: book.author } }}>
            {" "}
            {book.author}{" "}
          </Link>{" "} */}
      </Box>
      <Box className={classes.box}>
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
      </Box>
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
