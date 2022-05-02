import React from "react";
import { connect } from "react-redux";
import {
  getCart,
  deleteCartItem,
  updateQuantity,
  checkout,
} from "../store/cart-item";

const CartItem = (props) => {
  const {userCartItems} = props
  // console.log("cartitem state", props.state);
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }
  // console.log("cart item props", props);

  const cartInfo = userCartItems.map((item) => {
    return (
      <div key={item.id}>
        <div>User: {item.userId}</div>
        <div>
          Product:{" "}
          {
            props.state.products.find(
              (product) => product.id === item.productId
            ).name
          }
        </div>
        <div>
          Quantity: {item.quantity}
          <form>
            <select
              onChange={(ev) =>
                props.updateQuantity(item, Number(ev.target.value))
              }
            >
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
        </div>
        <button onClick={() => props.deleteCartItem(item)}> remove </button>
      </div>
    );
  });

  return (
    <div>
      <div>
        {props.state.auth.username}'s Cart: {cartInfo}
      </div>

      <button
        onClick={() =>
          props.state.cartItem.forEach((item) => props.checkout(item))
        }
      >
        {" "}
        Checkout{" "}
      </button>
    </div>
  );
};
//the checkout button on line 46 is really gonna link into some type of payment, right now its just to checkout if the thunk I set up works to update the purchased boolean on the cartItem -GS

const mapStateToProps = (state) => {
  const userCartItems = state.cartItem.filter(item => item.userId === state.auth.id)
  console.log(userCartItems)
  console.log(state)
  return {
    userCartItems,
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartItem: (cartItem) => dispatch(deleteCartItem(cartItem)),
    updateQuantity: async (cartItem, quantity) =>
      await dispatch(updateQuantity(cartItem, quantity)),
    checkout: async (cartItem) => await dispatch(checkout(cartItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
