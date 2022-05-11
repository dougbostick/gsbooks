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
        <div> 
            <h1>{author}</h1>
           {
             authorInfo.map( _author => {
               return (
                 <div key={_author.id}>
                   <p> {_author.imageUrl} </p>
                   <p> {_author.bio} </p>

                 </div>
               )
             })
           }
        </div>
         <h3> Books this author has written: </h3>
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
