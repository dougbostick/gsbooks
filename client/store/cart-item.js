import axios from "axios";

const ADD_CARTITEM = "ADD_CARTITEM";
const LOAD_CARTITEM = "LOAD_CARTITEM";
const DELETE_CARTITEM = "DELETE_CARTITEM"

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
    return state.filter((item) => item.productId !== action.cartItem.productId)
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
     let token = window.localStorage.getItem("token");
    const response = await axios.delete(`/api/cartitem/${cartItem.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({type: DELETE_CARTITEM, cartItem})
  }
}
