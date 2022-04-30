import React from "react";
import { connect } from "react-redux";

const GuestCartItem = (props) => {
  // console.log("props", props);
  const guestCart = JSON.parse(window.localStorage.getItem("guest_cart"));
  console.log("gc", guestCart);

  const remove = (productId) => {
    guestCart.filter((cartItem) => {
      return productId !== cartItem.product.id;
    });
    console.log("remove GC", guestCart);
    window.localStorage.setItem("guest_cart", JSON.stringify(guestCart));
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

// const mapStateToProps = (state) => {
//   return {
//     state,
//   };
// };

export default connect((state) => state)(GuestCartItem);
