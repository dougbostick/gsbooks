import React from "react";
import { connect } from "react-redux";
import { getCart, deleteCartItem } from "../store/cart-item";

const CartItem = (props) => {
  console.log("cart item props", props);
  // let userId;
  // let productId;
  // props.state.cartItem.length > 0
  //   ? props.state.cartItem.map((item) => {
  //       userId = item.userId;
  //       productId = item.productId;
  //     })
  //   : null;

  // const userName =
  //   props.state.users.length > 0
  //     ? props.state.users.find((userlist) => {
  //         userlist.id === userId;
  //       })
  //     : null;
  const cartInfo =
    props.state.cartItem.length > 0
      ? props.state.cartItem.map((item) => {
          return (
            <div key={item.id}>
              {/* <div>
                User:{" "}
                {props.state.users.find((user) => {
                  let _user;
                  return (_user = user.id === item.userId);
                })}
              </div> */}
              <div>
                Product:{" "}
                {
                  props.state.products.find((product) => {
                    return product.id === item.productId;
                  }).name
                }
              </div>
              <div>Quantity: {item.quantity}</div>
              <button onClick={() => props.deleteCartItem(item)}>
                {" "}
                remove{" "}
              </button>
            </div>
          );
        })
      : "no items";
  return (
    <div>
      <div>
        {" "}
        {props.state.cartItem.length > 0
          ? props.state.cartItem.map((item) => {
              return props.state.users.find((user) => {
                return user.id === item.userId;
              }).username;
            })
          : null}{" "}
        {/* {props.state.cartItem.length > 0
          ? props.state.cartItem.map((item) => {
              let user = null;
              if (!user) {
                return props.state.users.find((user) => {
                  return (user = (user.id === item.userId).username);
                });
              }
              return user;
            })
          : null}{" "} */}
        Cart: {cartInfo}
      </div>
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
    deleteCartItem: (cartItem) => dispatch(deleteCartItem(cartItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
