import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {deleteProduct} from '../store/products'
import AddProduct from './AddProduct'
import Searchbar from './Searchbar'

const SearchResults = (props) => {
  const {isAdmin, remove, products} = props
  let {searchTerm} = useLocation().state
  console.log(searchTerm)
        
  const searchResults = products.filter(book => {
    if (typeof searchTerm === Number) searchTerm = String(searchTerm)
      const authorName = book.author.toLowerCase()
      const bookName = book.name.toLowerCase()
      searchTerm = searchTerm.toLowerCase()
      return bookName.includes(searchTerm) || authorName.includes(searchTerm)
  })
  console.log(searchResults)
 
  const books = searchResults.map((book) => {
    return (
      <div key={book.id}>
      <Link to={`/products/${book.id}`} >
        <li >{book.name}</li>
        <div>Author: {book.author}</div>
        <div>Price: {book.price}</div>
      </Link> 
    
      {isAdmin ? <button onClick={ () => remove(book) } > X </button> : ''}
      </div>
    );
  });

  return (
    <div>
    {/* <Searchbar/> */}
      <h1> There {searchResults.length === 1 ? "is" : "are" } {searchResults.length} {searchResults.length === 1 ? "result" : "results" } matching {searchTerm}</h1>
      {books}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
