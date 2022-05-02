import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
 export const updateProfile = (username, firstName, lastName, email, address) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const res = await axios.put('/auth/me', {username, firstName, lastName, email, address}, {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }


export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
  // return dispatch({ type: 'GUEST', });
};

export const authenticate =
  (username, password, email, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password, email });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
