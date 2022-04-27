import React from "react";
import { connect } from "react-redux";
import { getCart, deleteCartItem, updateQuantity } from "../store/cart-item";

const CartItem = (props) => {
  console.log("cartitem state", props.state);
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }
  console.log("cart item props", props);
  const cartInfo =
    props.state.cartItem.length > 0
      ? props.state.cartItem.map((item) => {
          return (
            <div key={item.id}>
              <div>
                Product:{" "}
                {
                  props.state.products.find((product) => {
                    return product.id === item.productId;
                  }).name
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
        {props.state.auth.username}
        {"'s "}
        Cart: {cartInfo}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
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
