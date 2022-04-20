import React from "react";
import { connect } from "react-redux";

const CartItem = (props) => {
  return (
    <div>
      <div>Cart: {props.cartItem.productId} </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItem: state.cartItem,
  };
};

export default connect(mapStateToProps)(CartItem);
