import React from "react";
import axios from "axios";
import {connect} from 'react-redux';

const Products = (props) => {
    const books = props.products.map((book) => {
      return <li key={book.id}>{book.name}</li>;
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
    products: state.products
  };
};


export default connect(mapStateToProps)(Products);