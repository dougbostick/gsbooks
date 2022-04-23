import React from "react";
import { connect } from "react-redux";
import { getCart } from "../store/cart-item";

const CartItem = (props) => {
  console.log("cartitem props", props);
  const cartInfo =
    props.state.cartItem.length > 0
      ? props.state.cartItem.map((item) => {
          return (
            <div key={item.id}>
              <div>User: {item.userId}</div>
              <div>Product: {item.productId}</div>
              <div>Quantity: {item.quantity}</div>
            </div>
          );
        })
      : "no items";
  return (
    <div>
      <div>Cart: {cartInfo} </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // cartItem: state.cartItem,
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
