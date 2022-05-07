import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {deleteProduct} from '../store/products'
import AddProduct from './AddProduct'
import Searchbar from './Searchbar'
import Categories from './Categories'


const Products = (props) => {
  const {isAdmin, remove} = props
  
  const books = props.products.map((book) => {
    return (
      <tr key={book.id}>
        <td><Link to={`/products/${book.id}`}> {book.name} </Link>  </td>
        <td> {book.ISBN} </td>
        <td> {book.author} </td>
        <td> {book.price} </td>
        <td> {isAdmin ? <button onClick={ () => remove(book) } > X </button> : ''} </td>

      </tr>
    );
  });
  
  
  return (
    <div>
      <div className='product-table'>
        <table>
          <tbody>
            <tr>
              <th> Title </th>
              <th> ISBN </th>
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    isAdmin: state.auth.admin
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        remove: async(product) => {
            await dispatch(deleteProduct(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
