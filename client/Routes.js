import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Users from "./components/Users";
import { me } from "./store";
import store, { loadProducts, loadUsers, getCart } from "./store";
import CartItem from "./components/CartItem";
import PastOrders from "./components/PastOrders";
import GuestCartItem from "./components/GuestCartItem";
import Profile from "./components/Profile"


/*
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    //Rearranging the order of this solved the refresh problem. -GS
    await this.props.loadInitialData()
    await store.dispatch(loadProducts());
    await store.dispatch(loadUsers());
  }
  
  //I dont not know if this needs to be async -GS
  async componentDidUpdate(prevProps) {
    //if you werent logged in and now you are we want your data, (this is getCart() and me()) -GS
    if (prevProps.isLoggedIn !== this.props.isLoggedIn && this.props.isLoggedIn === true) {
      await this.props.loadUpdatedData()
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    // console.log("routes props", this.props);
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/users" component={Users} />
            <Route path="/cartItem" component={CartItem} />
            <Route path='/pastOrders' component={PastOrders}/>
            <Route path='/profile' component={Profile}/>
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={Products} />
            <Route path="/cartItem" component={GuestCartItem} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/profile" component={Profile}>
              <Redirect to="/login" />
            </Route>
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadUpdatedData: () => {
      dispatch(me())
      dispatch(getCart())
      //after a user is logged in and the updated data renders, if theres a guest cart in localStorage, remove it.
      window.localStorage.getItem("guest_cart") ? window.localStorage.removeItem("guest_cart") : null
    },
    getCart: () => dispatch(getCart()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
