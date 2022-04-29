import axios from "axios";

const ADD_CARTITEM = "ADD_CARTITEM";
const LOAD_CARTITEM = "LOAD_CARTITEM";
const DELETE_CARTITEM = "DELETE_CARTITEM";
const UPDATE_CARTITEM = "UPDATE_CARTITEM";

export default function cartItem(state = [], action) {
  if (action.type === LOAD_CARTITEM) {
    return action.cartItem;
  }

  if (action.type === ADD_CARTITEM) {
    console.log("cart reducer action", action);
    console.log("cartitem state", state);

    return [
      ...state.filter((item) => item.productId !== action.cartItem.productId),
      action.cartItem,
    ];
  }

  if (action.type === DELETE_CARTITEM) {
    return state.filter((item) => item.productId !== action.cartItem.productId);
  }

  if (action.type === UPDATE_CARTITEM) {
    return state.map((item) =>
      item.id === action.cartItem.id ? action.cartItem : item
    );
  }
  return state;
}

export const addCartItem = (cartItem, quantity) => {
  return async (dispatch) => {
    let token = window.localStorage.getItem("token");
    if (token) {
      let response = await axios.post(
        "/api/cartItem",
        { cartItem, quantity },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: ADD_CARTITEM, cartItem: response.data });
    } else {
      if (window.localStorage.getItem("guest_cart")) {
        const gcToken = window.localStorage.getItem("guest_cart");
        const guestCart = JSON.parse(gcToken);
        console.log(guestCart);
        const dup = guestCart.find((item) => item.cartItem === cartItem);
        console.log("dup", dup);
        if (dup) {
          dup.quantity += parseInt(quantity);
          guestCart.map((item) => {
            if (item.cartItem === dup.cartItem) {
              return dup;
            } else {
              return item;
            }
          });
          console.log("dup/ gc after dup", dup, guestCart);
          window.localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        } else {
          guestCart.push({ cartItem, quantity });
          window.localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        }
      } else {
        window.localStorage.setItem(
          "guest_cart",
          JSON.stringify([{ cartItem, quantity }])
        );
      }

      // console.log(window.localStorage.getItem("guest_cart"));
      //check local storage for cart
      //if there is a cart, json.parse the cart, then add to that, set the local storage with the new state of the cart
      //if no cart, set a cart with an array/ object of that item
      //instead of communicating with DB we commun with local storage --> local is new backend
      //grab guest cart from localstorage, instead of DB, then add it to the store
      //local storage is new DB
      //need to be able to CRUD localy stored cart (create, read, update (quantity), destroy)
    }
  };
};

export const getCart = () => {
  return async (dispatch) => {
    let token = window.localStorage.getItem("token");
    const response = await axios.get("/api/cartitem", {
      headers: {
        authorization: token,
      },
    });
    console.log("getCart response", response);
    dispatch({ type: LOAD_CARTITEM, cartItem: response.data });
  };
};

export const deleteCartItem = (cartItem) => {
  return async (dispatch) => {
    await axios.delete(`/api/cartitem/${cartItem.id}`);
    dispatch({ type: DELETE_CARTITEM, cartItem });
  };
};

export const updateQuantity = (cartItem, quantity) => {
  console.log(cartItem);
  return async (dispatch) => {
    let token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/cartitem/${cartItem.id}`,
      { quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: UPDATE_CARTITEM, cartItem: response.data });
  };
};

export const checkout = (cartItem) => {
  console.log(cartItem);
  return async (dispatch) => {
    let token = window.localStorage.getItem("token");
    console.log("no token", token);
    const response = await axios.put(
      `/api/cartitem/${cartItem.id}`,
      { purchased: true },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: UPDATE_CARTITEM, cartItem: response.data });
  };
};
