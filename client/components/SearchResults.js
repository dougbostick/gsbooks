import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {deleteProduct} from '../store/products'
import AddProduct from './AddProduct'
import Searchbar from './Searchbar'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { addCartItem } from "../store/cart-item";
import { addGuestCartItem } from "./AddGuestCartItem";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles({
    title: {
        marginLeft: '1.5rem'
    },
    
  media: {
    height: 275,
  },
  
  product: {
     margin: '0 1rem',
       "&:hover": {
      boxShadow: "3px 3px #F8B400",
    },
  },
  
  info: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  
  btn: {
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#FF6363",
      border: "1px solid black"
    }
  },
  
  back: {
    color: 'black',
    "&:hover": {
      color: "#FF6363",
    }
  }
 
});

const SearchResults = (props) => {
  const classes = useStyles()
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
      <Grid item key={book.id} xs={4}>
        <Card className={classes.product} style={{marginBottom: '1rem'}}> 
            <CardActionArea>
                <CardContent>
                     <CardMedia
                          className={classes.media}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Link to={`/products/${book.id}`}>
                            <img src={book.thumbUrl} style={{ height: "200px" }} />
                          </Link>
                    </CardMedia>
                    
                    <div className={classes.info}>
                        <Typography variant='h5'> 
                            <Link to={`/products/${book.id}`} >
                                {book.name}
                           </Link>
                        </Typography>
                        
                        <Typography variant='subtitle2' style={{fontSize: '1.3rem'}}>
                            ${book.price}
                        </Typography>
                    </div>
                    
                     <Typography variant='subtitle2' style={{marginTop: '0.5rem'}}> 
                        {book.author} 
                     </Typography>
            
                </CardContent>
                <Button onClick={() =>  props.isLoggedin
            ? addCartItem(book, 1)
            : addGuestCartItem(book, 1)} size="small" className={classes.btn} style={{marginLeft: '1rem', marginBottom: '1rem', color: 'white', fontWeight: 'bold', padding: '0.5rem'}}> Add to Cart </Button>
         
            </CardActionArea>
        
        </Card>
      </Grid>
    );
  });

  return (
    <>
      <Button style={{marginTop: '1rem', marginLeft: '1rem'}}> 
        <Link to={'/categories'}> <ArrowBackIcon className={classes.back}/> </Link>
      </Button>
      
      <Typography variant='h5' style={{textAlign: "left",fontWeight: 'bold', backgroundColor: '#FAF5E4',width: '75%', borderRadius: '10px', paddingLeft: '1rem', marginTop: '1rem', marginLeft: '1rem', marginBottom: '1rem'}}> 
        There {searchResults.length === 1 ? "is" : "are" } {searchResults.length} {searchResults.length === 1 ? "result" : "results" } matching {searchTerm}
      </Typography>
      <Grid container spacing={2}>
        {books}
      </Grid>
    </>
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
        addCartItem: (book, quantity) => dispatch(addCartItem(book, quantity)),
        remove: async(product) => {
            await dispatch(deleteProduct(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
