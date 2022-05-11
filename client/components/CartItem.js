import React from "react";
import { connect } from "react-redux";
import { getCart, deleteCartItem, updateQuantity } from "../store/cart-item";
import Stripe from "./Stripe";

const CartItem = (props) => {
  const { userCartItems } = props;
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }

  const total = props.state.cartItem.length
    ? props.state.cartItem
        .filter((item) => !item.purchased)
        .map((item) => item.quantity * (item.price / 100))
    : null;
 
  const cartInfo = userCartItems.map((item) => {
    if (item.purchased === false)
      return (
        <div key={item.id}>
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
      <div>
        Total: $
        {props.state.cartItem.length
          ? total.reduce((a, b) => {
              return a + b;
            }, 0)
          : 0}
      </div>
      {userCartItems.length > 0 ? <Stripe /> : null}
    </div>
  );
};


const mapStateToProps = (state) => {
  const userCartItems = state.cartItem.filter(
    (item) => item.userId === state.auth.id
  );
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
