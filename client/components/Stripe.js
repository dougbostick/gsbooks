import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { checkout } from "../store/cart-item";

const Stripe = (props) => {
  console.log("stripe state", props);

  const handleToken = (token, addresses) => {
    console.log({ token, addresses });
    props.cartItem.forEach((item) => props.checkout(item));
  };
  const cartItems = props.cartItem.length
    ? props.cartItem.map((item) => item.quantity * item.price)
    : null;

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51KsvEULlpsgBXKcLbXvhXNBmgCOpP5onZSkJZmOjFjWVAHmxEelPZb1v9nJscCWPYi19bdKAxwcSlx8dDNh20LmK00Q7tIgcbV"
        token={handleToken}
        billingAddress // = var defined from user info
        shippingAddress // = var defined from user info
        amount={
          props.cartItem.length ? cartItems.reduce((a, b) => a + b) * 100 : 0
        }
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: async (cartItem) => await dispatch(checkout(cartItem)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Stripe);
