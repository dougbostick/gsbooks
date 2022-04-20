import React from "react";
import { connect } from "react-redux";
import { addCartItem } from "../store/cart-item";

const ProductDetails = (props) => {
  // console.log("props", props);

  const book = props.products.find(
    (book) => book.id === parseInt(props.match.params.id)
  );

  console.log(book);
  if (!book) {
    return null;
  }
  return (
    <div>
      <div>Book: {book.name}</div>
      <div>Price: {book.price}</div>
      <button onClick={() => console.log(book.id)}>Add to cart</button>
    </div>
  );
};

//addCartItem(book.id)

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (bookId) => dispatch(addCartItem(bookId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
