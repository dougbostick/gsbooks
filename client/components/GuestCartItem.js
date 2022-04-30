import React from "react";
import { connect } from "react-redux";

const GuestCartItem = (props) => {
  console.log("props", props);
  const guestCart = window.localStorage.getItem("guest_cart");
  console.log(guestCart);
  return <div>Guest Cart: {guestCart}</div>;
};

// const mapStateToProps = (state) => {
//   return {
//     state,
//   };
// };

export default connect((state) => state)(GuestCartItem);
