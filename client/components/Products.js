import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {deleteProduct} from '../store/products'
import AddProduct from './AddProduct'
import Searchbar from './Searchbar'

const Products = (props) => {
  const {isAdmin, remove} = props
  const books = props.products.map((book) => {
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
  
  const categories = props.categories.map(category => {
    return (
      <div key={category.id}>
       <button> <Link to={`/categories/${category.id}`}> 
        {category.name}
       </Link>
       </button>
      </div>
      )
  })

  return (
    <div>
    <Searchbar/>
    {categories}
    {isAdmin ? <AddProduct/>: ''}
      Products:
      {books}
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
