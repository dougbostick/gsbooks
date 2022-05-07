import React from "react";
import { connect } from "react-redux";
import { getCart, deleteCartItem, updateQuantity } from "../store/cart-item";
import Stripe from "./Stripe";

const CartItem = (props) => {
  const { userCartItems } = props;
  console.log("cartitem state", props.state);
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }

  const total = props.state.cartItem.length
    ? props.state.cartItem
        .filter((item) => !item.purchased)
        .map((item) => item.quantity * (item.price / 100))
    : null;
  console.log("total", total);
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
      {total > 0 ? <Stripe /> : null}
    </div>
  );
};
//the checkout button on line 46 is really gonna link into some type of payment, right now its just to checkout if the thunk I set up works to update the purchased boolean on the cartItem -GS

const mapStateToProps = (state) => {
  //For each cartItem in the cart, return if the cartitems userId matches whoever is currently logged in. This is added to props in line 78.
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
