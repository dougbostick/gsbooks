import React from "react";
import { connect } from "react-redux";
import {Route, Redirect} from 'react-router-dom'

const GuestCartItem = (props) => {
  // console.log("props", props);
  const guestCart = JSON.parse(window.localStorage.getItem("guest_cart"));
  console.log("gc", guestCart);

  const remove = (productId) => {
    const updatedCart = guestCart.filter((cartItem) => {
      return productId !== cartItem.product.id;
    });
    window.localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    props.history.push('/cartItem')
  };
  
  const gcdisplay = guestCart.map((item) => {
    return (
      <div key={item.product.id}>
        <div> Book: {item.product.name}</div>
        <div> Price: {item.product.price}</div>
        <div> Quantity: {item.quantity}</div>
        <button onClick={() => remove(item.product.id)}>
          Remove from Cart
        </button>
      </div>
    );
  });
  return <div>Guest Cart: {gcdisplay}</div>;
};

export default connect((state) => state)(GuestCartItem);
