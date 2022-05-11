import React from "react";
import { connect } from "react-redux";
import { authenticate, addCartItem } from "../store";

/**
 * COMPONENT

 */

const AuthForm = (props) => {
  const { name, displayName, error, authenticate, addCartItem } = props;

  const isGuestCart = async () => {
    const guestCart = JSON.parse(window.localStorage.getItem("guest_cart"));
    guestCart
      ? await guestCart.forEach((item) =>
          addCartItem(item.product.id, item.quantity)
        )
      : "";
    window.localStorage.removeItem("guest_cart");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(evt);

    //This component is set so in the form, email is only seen so if we are on the sign up page. You cant sign up without an email.
    //So if email exists, this will create a new user
    if (evt.target.email) {
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email.value;

      await authenticate(username, password, formName, email);
      return isGuestCart();
    }
    //The rest of this function below is the function to sign in, where you currently dont need an email.
    else {
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      await authenticate(username, password, formName);
      return isGuestCart();
    }
  };

  return (
    <div>
      <form onSubmit={(evt) => handleSubmit(evt)} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>

        {
          //this will only show if we are on the sign up page
          displayName === "Sign Up" ? (
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
          ) : (
            ""
          )
        }
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      //const email = evt.target.email.value
      //if there is no email, it should be sign in instead of signup.
      // email === '' ? dispatch(authenticate(username, password, formName)) : dispatch(authenticate(username, password, email, formName));
    },
    authenticate: (username, password, formName, email) =>
      dispatch(authenticate(username, password, formName, email)),
    addCartItem: async (productId, quantity) =>
      await dispatch(addCartItem(productId, quantity)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
