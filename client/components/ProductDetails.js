import React from "react";
import { connect } from "react-redux";

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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductDetails);
