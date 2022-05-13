import React, {useState} from 'react';
import { connect } from "react-redux";
import { authenticate, addCartItem } from "../store";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    
    '& .MuiFormLabel-root': {
      padding: '1rem'
    }
  },
  //Need to ask mentor about replacing image here -GS
  image: {
    backgroundImage: 'url(/assets/JankoBook.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 2),
  },
  
  formControl: {
    marginLeft: '0.3rem'
  }
  
  
}));


const AuthForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const classes = useStyles();
    const { name, displayName, error, authenticate, addCartItem } = props;
    
    const isGuestCart = async() => {
        const guestCart = JSON.parse(window.localStorage.getItem("guest_cart"))
        //it looks weird, but item.product is correct, we want the entire object. not just the id -GS
        guestCart ?  await guestCart.forEach(item => addCartItem(item.product, item.quantity)) : ''
        window.localStorage.removeItem("guest_cart")
    }
 
 
    const handleSubmit = async (evt) => {
      evt.preventDefault();
      setUsernameError(false)
      setPasswordError(false)
      setEmailError(false)
      
        if (username === '') setUsernameError(true) 
        if (password === '') setPasswordError(true)
     
     //Sign up
      if(email) {
           if (email === '') setEmailError(true)
          await authenticate(username, password, name, email);
          return isGuestCart()
      }
       //Sign In
      else {
        await authenticate(username, password, name)
        return isGuestCart()
      }
    }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      
        <div className={classes.paper}>
        
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5">
            {displayName}
          </Typography>
          
          <form className={classes.form} onSubmit={(evt) => handleSubmit(evt)} name={name} noValidate>
            <TextField 
            onChange={(ev) => setUsername(ev.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              type='text'
              error={usernameError}
              InputProps={{className: classes.input}}
            />
            <TextField
             onChange={(ev) => setPassword(ev.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
               error={passwordError}
            />
            
            {displayName === "Sign Up" ? 
             <TextField
              onChange={(ev) => setEmail(ev.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              type="text"
              id="email"
               error={emailError}
            /> : ''}
             {error && error.response && <div style={{marginTop: 0, color: 'red'}}> {error.response.data} </div>}
        
            <FormControlLabel className={classes.formControl}
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {displayName}
            </Button>
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              
              {name === 'signup' ?
              <Grid item>
                <Link href='/login' variant="body2">
                  Already have an account? Log in!
                </Link>
               </Grid>
                : 
                <Grid item>
                  <Link href='/signup' variant="body2">
                  Dont have an account? Sign up!
                </Link> 
              </Grid> }
              
            </Grid>
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
    },
    authenticate: (username, password, formName, email) =>
      dispatch(authenticate(username, password, formName, email)),
    addCartItem: async (productId, quantity) =>
      await dispatch(addCartItem(productId, quantity)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
