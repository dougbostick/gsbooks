import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../store";
import Searchbar from './Searchbar'
import { AppBar, Toolbar, Typography, MenuItem } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
 
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  
  AppBar: {
      margin:  '0'
  },
  
}));


const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
           <Link to={'/home'} style={{textDecoration: "inherit", color: 'inherit'}}> Graceshopper </Link>
          </Typography>
          
       
            <Link to="/categories" style={{textDecoration: "inherit", color: 'inherit'}}> <MenuItem> Books </MenuItem> </Link>
            { isAdmin ? <Link to='/users' style={{textDecoration: "inherit", color: 'inherit'}}> <MenuItem> Users </MenuItem> </Link> : ''}
          
          <div className={classes.search}>
            <Searchbar
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          

         
         {isLoggedIn ? 
         <>
        <Link to="/profile" style={{textDecoration: "inherit", color: 'inherit'}}> <MenuItem> Profile </MenuItem> </Link>
        <MenuItem onClick={handleClick}> Logout </MenuItem>
        <Link to="/cartItem" > <MenuItem> <ShoppingCartOutlinedIcon style={{color: 'white'}}/> </MenuItem></Link>
        </>
        :
        <>
          <Link to="/login" style={{textDecoration: "inherit", color: 'inherit'}}> <MenuItem> Login </MenuItem> </Link>
          <Link to="/signup" style={{textDecoration: "inherit", color: 'inherit'}}> <MenuItem> Sign Up </MenuItem> </Link>
          <Link to="/cartItem" > <MenuItem> <ShoppingCartOutlinedIcon style={{color: 'white'}}/> </MenuItem></Link>
        </>
         }
         
            
        
        
        
        
        </Toolbar>
      </AppBar>
    </div>
    )
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin

  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

