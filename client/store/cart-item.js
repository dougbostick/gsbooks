import axios from "axios";

const ADD_CARTITEM = "ADD_CARTITEM";

export default function cartItem(state = [], action) {
  if (action.type === "ADD_CARTITEM") {
    console.log("cart reducer action", action);
    console.log("cartitem state", state);
    return { ...state, cart: action.cartItem }; // if there is an issue maybe look here??? -GS
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
