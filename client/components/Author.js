import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Searchbar from './Searchbar'

const Products = ({products}) => {
  const {author} = useLocation().state
  console.log("AUTHOR", author)
  
  const authorBooks = products.filter(book => book.author === author)
  const books = authorBooks.map((book) => {
    return (
      <div key={book.id}>
          <Link to={`/products/${book.id}`} >
            <li >{book.name}</li>
            <div>Price: {book.price}</div>
          </Link> 
      </div>
    );
  });

  return (
    <div>
        <Searchbar/>
        <div> 
            <h1>{author}</h1>
            <p> {author.bio} </p>
            <div>{author.imageUrl} </div>
        </div>
         <h3> Books this author has written: </h3>
         {books}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Products);
