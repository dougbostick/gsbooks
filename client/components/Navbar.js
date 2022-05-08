import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../store";
import Searchbar from './Searchbar'


const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <h1>Grace Shopper Books</h1>
    <nav>
      {isLoggedIn ? (
        <div className='nav'>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          {/* <Link to="/products">Products</Link> */}
          { isAdmin ? <Link to='/users'>Admin</Link> : ''}
          <Link to="/categories">Books</Link>
          <Link to="/cartItem">Cart</Link>
          <Link to="/profile">Profile</Link>
          <Searchbar/>


          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className='nav'>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {/* <Link to="/products">Products</Link> */}
          <Link to="/categories">Books</Link>
          <Link to="/cartItem">Cart</Link>
          <Link to="/profile"> Profile </Link>
          <Searchbar/>


        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin

  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
