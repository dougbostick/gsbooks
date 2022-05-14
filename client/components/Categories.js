import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  title: {
    height: "25px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1rem",
  },

  root: {
    maxWidth: 345,
  },
  
  category: {
    '&:hover': {
      boxShadow: "3px 3px #F8B400" 
    },
  },

  categoryButton: {
    paddingLeft: "0.8rem",
  },

  categoryName: {
    textAlign: "left",
    fontWeight: 'bold',
    backgroundColor: '#FAF5E4',
    width: '75%',
    borderRadius: '10px',
    paddingLeft: '1rem'
  },


  productContainer: {
    padding: "1rem 0",
  },
  media: {
    height: '200px',
  },
});

const Categories = (props) => {
  const { products } = props;
  const classes = useStyles();

  const categories = props.categories.map((category) => {
    const firstThreeProducts = products
      .filter((product) => product.categoryId === category.id)
      .splice(0, 3);
    return (
      <Grid item xs={5} key={category.id}>
        <Card className={classes.category}>
          <CardContent>
            <Typography
              variant="h5"
              className={classes.categoryName}
            >
            {category.name}
            </Typography>
          </CardContent>

          <CardActionArea className={classes.productContainer}>
            <Grid container spacing={2} justifyContent="flex-start">
              {firstThreeProducts.map((product) => {
                //the plan is to have the first 3 book images thats in that category displayed, when clicked will link to that specific book.
                return (
                  <Grid
                    item
                    xs={3}
                    key={product.id}
                    style={{ paddingLeft: "1.5rem",
                    minWidth: 175,
                    maxWidth: 175
                   }}
                  >
                    <Link to={`/products/${product.id}`}>
                      <Card className={classes.threeProducts}>
                        <CardMedia className={classes.media} style={{background: `url(${product.thumbUrl})`, backgroundSize: 'cover'}}>
                        </CardMedia>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </CardActionArea>

          <CardActions className={classes.categoryButton}>
            <Button size="small" style={{fontWeight: 'bold'}}>
              <Link to={`/categories/${category.id}`}>
                View All (
                {
                  products.filter((item) => item.categoryId === category.id)
                    .length
                }
                )
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', marginBottom: '1rem'}}>
       <Typography
        variant="h4"
        style={{
          padding: "1rem",
          //marginLeft: "9rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          fontWeight: "bold", 
          fontSize: 48
        }}
        className={classes.pageTitle}
      >
        {" "}
        From Our Bookshelves{" "}
      </Typography>
      <Typography
        variant="h4"
        style={{
          fontStyle: "italic",
          fontSize: 14
        }}
        className={classes.pageTitle}
      >
        {" "}
        Discover the best books to read right now including trending titles, bookseller recommendations, new releases and more{" "}
      </Typography>
       </div>
      <Grid
        container
        spacing={10}
        justifyContent="center"
        className={classes.grid}
      >
        {categories}
      </Grid>
    </>
  );
};

export default connect((state) => state)(Categories);