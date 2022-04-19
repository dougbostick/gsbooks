import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Products = (props) => {
  const books = props.products.map((book) => {
    return (
      <Link to={`/api/product/${book.id}`}>
        <li key={book.id}>{book.name}</li>
      </Link>
    );
  });

  return (
    <div>
      Products:
      {books}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Products);
