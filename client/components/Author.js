import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Searchbar from './Searchbar'

const Products = (props) => {
  const {author} = useLocation().state
  console.log("AUTHOR", author)
  const {products, authors } = props
  console.log("PROPS", props)
  
  const authorBooks = products.filter(book => book.author === author)
  const authorInfo = props.authors.filter( auth => auth.name === author)
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

  console.log("AUTHOR INFO", authorInfo)

  return (
    <div>
        <Searchbar/>
        <div > 
            <h1>{author}</h1>
           {
             authorInfo.map( _author => {
               return (
                 <div className='about-author' key={_author.id}>
                  <img className='author-img' src={`authorPhotos/${_author.imageUrl}`} />
                  <p className='author-bio'> {_author.bio} </p>
                 </div>
               )
             })
           }
        </div>
         <h3> Books by {author}: </h3>
         {books}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    authors: state.authors
  };
};

export default connect(mapStateToProps)(Products);
