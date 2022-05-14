import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Api from "./ImgApi";

import { deleteProduct } from "../store/products";
import AddProduct from "./AddProduct";
import Searchbar from "./Searchbar";
import Categories from "./Categories";

const Products = (props) => {
  const { isAdmin, remove, history } = props;

  const books = props.products.map((book) => {
    return (
      <tr key={book.id}>
        <td>
          <Link to={`/products/${book.id}`}> {book.name} </Link>{" "}
        </td>
        <td> {book.author} </td>
        <td> {book.price} </td>
        <td>
          {" "}
          {isAdmin ? (
            <button className='delete-button' onClick={() => remove(book)}> Delete </button>
          ) : (
            ""
          )}{" "}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="Sort">
        <select
          onChange={(ev) => history.push(`/products/sort/${ev.target.value}`)}
        >
          <option value=""> Sort By </option>
          <option value="name, asc"> Name ASC </option>
          <option value="name, desc"> Name DESC </option>
          <option value="price, asc"> Price ASC </option>
          <option value="price, desc"> Price DESC </option>
        </select>
      </div>
      <div className="product-table">
        <table>
          <tbody>
            <tr>
              <th> Title </th>
              <th> Author </th>
              <th> Price </th>
              <th> Delete Product </th>
            </tr>
            {books}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const sort = match.params.sort;
  if (sort === "price, asc") {
    state.products.sort((a, b) => a.price - b.price);
  }

  if (sort === "price, desc") {
    state.products.sort((a, b) => b.price - a.price);
  }

  if (sort === "name, asc") {
    state.products.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "name, desc") {
    state.products.sort((a, b) => b.name.localeCompare(a.name));
  }

  return {
    products: state.products,
    categories: state.categories,
    isAdmin: state.auth.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: async (product) => {
      await dispatch(deleteProduct(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
