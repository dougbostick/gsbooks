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

  categoryButton: {
    marginBottom: "1rem",
    paddingLeft: "0.8rem",
  },

  categoryName: {
    textAlign: "left",
  },

  grid: {
    marginTop: "1.5rem",
  },

  productContainer: {
    padding: "1rem 0",
  },
  media: {
    margin: "8px",
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
        <Card classes={classes.category}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="primary"
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
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    <Link to={`/products/${product.id}`}>
                      <Card className={classes.threeProducts}>
                        <CardMedia className={classes.media}>
                          {<img src={product.thumbUrl}></img>}
                        </CardMedia>
                        {product.name}
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </CardActionArea>

          <CardActions className={classes.categoryButton}>
            <Button size="small" color="primary">
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
      <div className={classes.title}>
        {" "}
        <h1> Categories </h1>{" "}
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
