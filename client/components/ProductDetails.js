import React from "react";
import { connect } from "react-redux";

const ProductDetails = (props) => {
  const book = props.products.find((book) => {
    book.id === match.params.id;
    console.log(book);
  });
  return <hr />;
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductDetails);
