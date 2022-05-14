import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../store";
import Searchbar from './Searchbar'
import { AppBar, Toolbar, Typography, MenuItem } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  AppBar: {
    margin: "0",
    backgroundColor: "#125B50",
  },
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link
              to={"/home"}
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              {" "}
              Graceshopper{" "}
            </Link>
          </Typography>

          <Link
            to="/categories"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            {" "}
            <MenuItem> Books </MenuItem>{" "}
          </Link>
          {isAdmin ? (
            <Link
              to="/users"
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              {" "}
              <MenuItem> Admin </MenuItem>{" "}
            </Link>
          ) : (
            ""
          )}

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
          <div className={classes.root}>
            <Button ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}> 
              <AccountCircleIcon style={{color: 'white'}} />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <Link to="/profile" style={{textDecoration: "inherit", color: 'inherit'}}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <MenuItem onClick={handleClick}> Logout </MenuItem>
          <Link to="/cartItem" > <MenuItem> <ShoppingCartOutlinedIcon style={{color: 'white'}}/> </MenuItem></Link>
          </>
        :
        <>
        <div className={classes.root}>
            <Button ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}> 
              <AccountCircleIcon style={{color: 'white'}} />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <Link to="/login" style={{textDecoration: "inherit", color: 'inherit'}}><MenuItem onClick={handleClose}>Login</MenuItem></Link>
                        <Link to="/signup" style={{textDecoration: "inherit", color: 'inherit'}}><MenuItem onClick={handleClose}>Sign Up</MenuItem></Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
  
          <Link to="/cartItem" > <MenuItem> <ShoppingCartOutlinedIcon style={{color: 'white'}}/> </MenuItem></Link>
        </>
         }
         
        </Toolbar>
      </AppBar>
    </div>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
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
