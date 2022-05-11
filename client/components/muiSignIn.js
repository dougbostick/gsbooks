import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { authenticate, addCartItem } from "../store";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url("/assets/bookcase5.jpeg")`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const { name, displayName, error, authenticate, addCartItem } = props;

  const isGuestCart = async () => {
    const guestCart = JSON.parse(window.localStorage.getItem("guest_cart"));
    guestCart
      ? await guestCart.forEach((item) =>
          addCartItem(item.product.id, item.quantity)
        )
      : "";
    window.localStorage.removeItem("guest_cart");
  };

  const classes = useStyles();

  const handleSubmit = async (evt) => {
    evt.persist();
    evt.preventDefault();
    console.log("evt", evt);
    console.log(evt.currentTarget.getAttribute("data-name"));
    //This component is set so in the form, email is only seen so if we are on the sign up page. You cant sign up without an email.
    //So if email exists, this will create a new user
    //   if (evt.target.email) {
    //     const formName = evt.target.name;
    //     const username = evt.target.username.value;
    //     const password = evt.target.password.value;
    //     const email = evt.target.email.value;

    //     await authenticate(username, password, formName, email);
    //     return isGuestCart();
    //   }
    //   //The rest of this function below is the function to sign in, where you currently dont need an email.
    //   else {
    //     const formName = evt.target.name;
    //     const username = evt.target.username.value;
    //     const password = evt.target.password.value;
    //     await authenticate(username, password, formName);
    //     return isGuestCart();
    //   }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(evt) => handleSubmit(evt)}
            name={name}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      //const email = evt.target.email.value
      //if there is no email, it should be sign in instead of signup.
      // email === '' ? dispatch(authenticate(username, password, formName)) : dispatch(authenticate(username, password, email, formName));
    },
    authenticate: (username, password, formName, email) =>
      dispatch(authenticate(username, password, formName, email)),
    addCartItem: async (productId, quantity) =>
      await dispatch(addCartItem(productId, quantity)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(SignIn);
export const Signup = connect(mapSignup, mapDispatch)(SignIn);
