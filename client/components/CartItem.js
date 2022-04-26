import React from "react";
import { connect } from "react-redux";
import { getCart, deleteCartItem, updateQuantity } from "../store/cart-item";

const CartItem = (props) => {
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }
  console.log("cartitem props", props);
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
        {props.state.users.length > 0
          ? props.state.users.find((user) => {
              return props.state.cartItem.map((item) => {
                return user.id === item.userId;
              });
            }).username
          : null}
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
    getCart: () => dispatch(getCart()),
    deleteCartItem: (cartItem) => dispatch(deleteCartItem(cartItem)),
    updateQuantity: async (cartItem, quantity) =>
      await dispatch(updateQuantity(cartItem, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
