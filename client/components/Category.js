import React from "react";
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import {deleteProduct} from '../store/products'
import AddProduct from './AddProduct'
import Searchbar from './Searchbar'

const Category = (props) => {
  const {isAdmin, remove, products, category} = props
  const books = products.map((book) => {
    return (
      <div key={book.id}>
      <Link to={`/products/${book.id}`} >
        <li >{book.name}</li>
        <div>Price: {book.price}</div>
      </Link> 
    
      {isAdmin ? <button onClick={ () => remove(book) } > X </button> : ''}
      </div>
    );
  });

  return (
    <div>
    <Searchbar/>
    <h3> {category} </h3>
    {isAdmin ? <AddProduct/>: ''}
      {books}
    </div>
  );
};

const mapStateToProps = (state, {match}) => {
  return {
    category: state.categories.filter(category => category.id === match.params.id*1).map(category => category.name).join(''),
    products: state.products.filter(product => product.categoryId === match.params.id*1),
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
