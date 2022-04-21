import React from "react";
import { connect } from "react-redux";

const CartItem = (props) => {
  console.log("cartitem props", props);
  const quantity = props.state.cartItem.cart
    ? props.state.cartItem.cart.productId
    : "no items";
  return (
    <div>
      <div>Cart: {quantity} </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // cartItem: state.cartItem,
    state,
  };
};

export default connect(mapStateToProps)(CartItem);
