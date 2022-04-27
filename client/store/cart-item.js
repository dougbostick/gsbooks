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
    let response = await axios.post(
      "/api/cartItem",
      { cartItem, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("cartitem thunk response", response);
    dispatch({ type: ADD_CARTITEM, cartItem: response.data });
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

