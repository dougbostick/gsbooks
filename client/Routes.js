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

/*
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    if (this.props.isLoggedIn) {
      await store.dispatch(getCart());
    }
    await store.dispatch(loadProducts());
    await store.dispatch(loadUsers());
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log("routes props", this.props);
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/users" component={Users} />
            <Route path="/cartItem" component={CartItem} />
            <Route path="/pastOrders" component={PastOrders} />
            {<Redirect to="/home" />}
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={Products} />
            <Route path="/cartItem" component={CartItem} />
            <Route path="/products/:id" component={ProductDetails} />
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
    getCart: () => dispatch(getCart()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
