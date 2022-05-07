import React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { addCartItem } from "../store/cart-item";
import { updateProduct } from "../store/products";
import UpdateProduct from "./UpdateProduct";
import { addGuestCartItem } from "./AddGuestCartItem";

const ProductDetails = (props) => {
  const { addCartItem, book, isAdmin, categories } = props;
  const bookCategory = categories
    .filter((category) => category.id === book.categoryId)
    .map((book) => book.name)
    .join("");
  console.log(bookCategory);
  if (!book) {
    return null;
  }
  let quantity = 1;
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }

  //can add isLoggedin ? to seperate addtocart or addtoguestcart
  return (
    <div>
      <div>Book: {book.name}</div>
      <div>
        {" "}
        Author:{" "}
        <Link to={{ pathname: "/author", state: { author: book.author } }}>
          {" "}
          {book.author}{" "}
        </Link>{" "}
      </div>
      <div>ISBN: {book.isbn}</div>
      <div>Price: {book.price}</div>
      <div> Category: {bookCategory} </div>
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
      <div>
        {isAdmin ? (
          <Route path="/products/:id" component={UpdateProduct} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

//addCartItem(book.id)

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
