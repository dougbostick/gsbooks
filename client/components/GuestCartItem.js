import React from "react";
import { connect } from "react-redux";
import {Route, Redirect} from 'react-router-dom'

const GuestCartItem = (props) => {
  // console.log("props", props);
  const guestCart = JSON.parse(window.localStorage.getItem("guest_cart"));
  console.log("gc", guestCart);
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }


  const remove = (productId) => {
    const updatedCart = guestCart.filter((cartItem) => {
      return productId !== cartItem.product.id;
    });
    window.localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    props.history.push('/cartItem')
  };

  const updateQuantity = (id, num) => {
    for (let item = 0; item<guestCart.length; item++){
      if (guestCart[item].product.id == id){
        guestCart[item].quantity = num;
        window.localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        props.history.push('/cartItem');
      }
    }
  }
  
  
  const gcdisplay = !guestCart ? null : guestCart.map((item) => {
    return (
      <div key={item.product.id}>
        <div> Book: {item.product.name}</div>
        <div> Price: {item.product.price}</div>
        <div> Quantity: {item.quantity}</div>
        <form>
          <select onChange ={(ev) => updateQuantity(item.product.id, Number(ev.target.value))}>
            <option>{item.quantity}</option>
              {inventory.map((inv) => {
                return (
                  <option value={inv} key={inv}> 
                    {inv}
                  </option>
                );
              })}
          </select>
        </form>
        <button onClick={() => remove(item.product.id)}>
          Remove from Cart
        </button>
      </div>
    );
  });
  return <div>Guest Cart: {gcdisplay}</div>;
};

export default connect((state) => state)(GuestCartItem);
