import React from "react";
import { connect } from "react-redux";
import { addCartItem } from "./store";

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
      <button onClick={() => addcartthunk}>Add to cart</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductDetails);
