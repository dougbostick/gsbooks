import axios from "axios";

const ADD_CARTITEM = "ADD_CARTITEM";
const LOAD_CARTITEM = "LOAD_CARTITEM";

export default function cartItem(state = [], action) {
  if (action.type === ADD_CARTITEM) {
    console.log("cart reducer action", action);
    console.log("cartitem state", state);
    const duplicate = state.includes(action.cartItem.productId);
    if (duplicate) {
      //cart update
      state = state.map((item) => {
        if (item.productId === action.cartItem.productId) {
          return action.cartItem;
        } else {
          return item;
        }
      });
      console.log("duplicate state", state);
      return state;
    } else {
      return [...state, action.cartItem]; // if there is an issue maybe look here??? -GS
    }
  }
  if (action.type === LOAD_CARTITEM) {
    return action.cartItem;
  }
  return state;
}

export const addCartItem = (cartItem) => {
  return async (dispatch) => {
    let token = window.localStorage.getItem("token");
    let response = await axios.post(
      "/api/cartItem",
      { cartItem },
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
