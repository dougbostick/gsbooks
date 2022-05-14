import React from "react";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { addCartItem } from "../store/cart-item";
import { updateProduct } from "../store/products";
import UpdateProduct from "./UpdateProduct";
import { addGuestCartItem } from "./AddGuestCartItem";
import DescApi from "./DescApi";
import ISBNApi from "./ISBNApi";
import ImgApi from "./ImgApi";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  media: {

    margin: "18px",
    height: "250px",
    width: "175px",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    // backgroundColor: "#3a7563",

    height: "300px",
    width: "200px",

  },
  
  update: {
    margin: "8px",
  },

});

function MuiProductDetails(props) {
  const { addCartItem, book, isAdmin, categories } = props;
  console.log("props", props);
  const bookCategory = book
    ? categories
        .filter((category) => category.id === book.categoryId)
        .map((book) => book.name)
        .join("")
    : null;
  if (!book) {
    return null;
  }
  let quantity = 1;
  const inventory = new Array(10);
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = i + 1;
  }
  const classes = useStyles();

  return (
    <div style={{display: 'flex', flexDirection:'column'}}>
        <Card style={{marginBottom: '1rem', display:'flex', justifyContent:'center', width: '50%', margin:'auto', marginTop: '1rem'}}>
          <CardActionArea>
            <CardContent style={{display:'flex', justifyContent: 'center' }}>
                <CardMedia> 
                  <img src={book.thumbUrl} className={classes.media} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}/>
                </CardMedia>
    
              <div style={{display: 'flex', flexDirection:'column', marginLeft: '3rem'}}> 
                <Typography variant="h5" style={{ fontWeight: 'bold'}}>
                  {book.name}
                </Typography>
                
                  <Typography variant="subtitle1" style={{marginTop: '0.3rem'}}>
                  <Link to={{ pathname: "/author", state: { author: book.author } }}>
                    by {book.author}
                  </Link>
                </Typography>
                
                  <Typography variant="body2" color="textSecondary" style={{marginTop: '1rem'}}>
                  ISBN: {book.isbn}
                </Typography>
                
                 <Typography variant="subtitle2" style={{marginTop: '1rem', fontSize: '1.3rem'}}>
                  ${book.price}
                </Typography>
          
                   <Button onClick={() =>  props.isLoggedin.id
            ? addCartItem(book, 1)
            : addGuestCartItem(book, 1)} size="small" style={{marginBottom: '1rem', color: 'white', fontWeight: 'bold', backgroundColor: 'grey', padding: '0.5rem', marginTop: '1rem'}}> Add to Cart </Button>

               {isAdmin ? (
              <Route path="/products/:id" component={UpdateProduct} />
            ) : (
              ""
            )}
                 
              </div>
            </CardContent>
            
                <div style={{padding: '1rem'}}>
                <Typography variant='h6'> Description </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{lineHeight: '1.5rem',}}>
                  {book.description}
                </Typography>
                </div> 

          </CardActionArea>
        </Card>
    </div>
  );
}

const mapStateToProps = (state, { match }) => {
  return {
    isLoggedin: state.auth,
    isAdmin: state.auth.admin,
    products: state.products,
    categories: state.categories,
    book: state.products.find((book) => book.id === parseInt(match.params.id)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (book, quantity) => dispatch(addCartItem(book, quantity)),
    update: async (book) => await dispatch(updateProduct(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MuiProductDetails);
