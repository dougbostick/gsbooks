import React from "react";
import { connect } from "react-redux";

const ProductDetails = (props) => {
  // console.log("props", props);
  const book = props.products.find(
    (book) => book.id === parseInt(props.match.params.id)
  );

  console.log(book);

  return <div>{book.id ? book.name : "no books for you"}</div>;
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductDetails);
