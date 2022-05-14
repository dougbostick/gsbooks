import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
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
    },
  }
    
});



const Products = (props) => {
  const classes = useStyles()
  const {author} = useLocation().state
  const {products, authors } = props
  
  const authorBooks = products.filter(book => book.author === author)
  const authorInfo = props.authors.filter( auth => auth.name === author)
  
  const books = authorBooks.map((book) => {
    return (
   <Grid item key={book.id} xs={4}>
            <Card className={classes.product}> 
                <CardActionArea>
                    <CardContent>
                         <CardMedia className={classes.media} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> 
                         <Link to={`/products/${book.id}`} >
                            <img src={book.thumbUrl} style={{height: '200px'}}/>
                         </Link>
                    </CardMedia>
                        
                        <div className={classes.info}>
                            <Typography variant='h5'> {book.name} </Typography>
                            <Typography variant='subtitle2' style={{fontSize: '1.3rem'}}> ${book.price} </Typography>
                        </div>
                        
                         <Typography variant='subtitle2' style={{marginTop: '0.3rem'}}> {book.author} </Typography>
                
                    </CardContent>
                    
                    <Link to={`/products/${book.id}`} >
                    <Button className={classes.btn} style={{marginLeft: '1rem', marginBottom: '1rem', color: 'white', fontWeight: 'bold', padding: '0.5rem'}} 
                    > View Details </Button>
                    </Link>
                </CardActionArea>
            </Card>
      </Grid>
      )
  });


  return (
    <div>
      
        <Card style={{height: '450px', display: 'flex', width: '50%', margin: 'auto', marginTop: '2rem', marginBottom: '2rem'}}> 
           {
             authorInfo.map( _author => {
               return (
               <>
               <div style={{width: '50%', backgroundColor:'red', background: `url(authorPhotos/${_author.imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                </div>
                
                 <div style={{display:'flex', flexDirection: 'column', width:'50%', padding: '2rem', alignItems: 'center'}}>
                    <Typography variant='h5' style={{fontWeight: 'bold', fontFamily: "optima"}} > {_author.name} </Typography>
                  <Typography variant='subtitle2' style={{marginTop: '0.5rem', lineHeight: '2rem'}}> {_author.bio} </Typography>
                 </div>
                 </>
               )
             })
           }
        </Card>
         <Typography variant="h6" style={{marginLeft: '1rem', marginBottom: '1rem', fontFamily: "optima"}}> All Books By {author} </Typography>
         <Grid container spacing={2}>
         {books}
         </Grid>
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
