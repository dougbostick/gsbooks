import React from "react";
import { connect } from "react-redux";
import { addCartItem } from "../store/cart-item";
import {updateProduct} from '../store/products'


const ProductDetails = (props) => {
  // console.log("props", props);
  const { addCartItem, book, isAdmin } = props;
  console.log(book);
  if (!book) {
    return null;
  }
  //isAdmin would go in this return as a "if/else", trying to figure out if we need a form to update the product like jpfp, which I would need to change page to have a constructor, or if there is an easier way. -GS
  return (
    <div>
      <div>Book: {book.name}</div>
      <div>Price: {book.price}</div>
      <button onClick={() => addCartItem(book.id)}>Add to cart</button>
    </div>
  );
};

//addCartItem(book.id)

const mapStateToProps = (state, {match}) => {
  return {
    isAdmin: state.auth.admin,
    products: state.products,
    book: state.products.find(book => book.id === parseInt(match.params.id))
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (bookId) => dispatch(addCartItem(bookId)),
    update: async(book) => await dispatch(updateProduct(book))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
