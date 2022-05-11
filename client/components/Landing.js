import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url("/assets/bookcase4.jpeg")`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  btn: {
    height: "5rem",
    width: "9rem",
    margin: "8px",
    textAlign: "center",
    backgroundColor: "maroon",
    // boxShadow: " 4px 4px 1px gray",
    fontWeight: "bold",
  },
}));
export default function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Button
        className={classes.btn}
        variant="contained"
        color="secondary"
        href="/products"
      >
        Browse Books
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="secondary"
        href="/login"
      >
        Sign In
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="secondary"
        href="/signup"
      >
        Create Account
      </Button>
    </div>
  );
}
