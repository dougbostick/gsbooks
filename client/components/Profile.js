import React, { Component, useState } from 'react';
import {connect} from 'react-redux'
import {updateProfile} from '../store';
import PastOrders from './PastOrders';
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
    '& .MuiFormLabel-root': {
      padding: '1rem'
    }
  },
  
  page: {
    marginLeft: '1rem'
  },
 
  submit: {
    margin: theme.spacing(3, 0, 2, 2),
  },
  
}));

  const Profile = (props) => {
    const classes = useStyles()
    const [username, setUsername] = useState(props.auth.username)
    const [firstName, setFirstname] = useState(props.auth.firstName)
    const [lastName, setLastname] = useState(props.auth.lastName)
    const [email, setEmail] = useState(props.auth.email)
    const [address, setAddress] = useState(props.auth.address)
    const [error, setError] = useState('')
    
      async function save(ev) {
        ev.preventDefault()
        try{
          await props.update(username, firstName, lastName, email, address)
        }
        catch(err){
          setError(err)
        }
      }
  
    return(
      <>
        <Typography variant='h6' className={classes.page} style={{textAlign:'center', marginTop: '2rem'}}> Edit Your Personal Details </Typography>
        <Grid container justifyContent='center' spacing={6}>
         <Grid item xs={8}>  
          <form className={classes.root} onSubmit={ ev => save(ev)}>
              <TextField 
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  type='text'
                  InputProps={{className: classes.input}}
                />
              
                <TextField 
                  value={firstName}
                  onChange={(ev) => setFirstname(ev.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="First Name"
                  name="first name"
                  type='text'
                  InputProps={{className: classes.input}}
               />
              
                <TextField 
                  value={lastName}
                  onChange={(ev) => setLastname(ev.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Last name"
                  name="last name"
                  type='text'
                  InputProps={{className: classes.input}}
                />
              
                <TextField 
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Email"
                  name="email"
                  type='text'
                  InputProps={{className: classes.input}}
                />
              
                <TextField 
                  value={address}
                  onChange={(ev) => setAddress(ev.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Address"
                  name="Address"
                  type='text'
                  InputProps={{className: classes.input}}
                />
  
             <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{margin: 'auto'}}
              >
                Update Details
              </Button>
              { error }
          </form>
          </Grid>
          
          <Grid item xs={6}>
          <PastOrders />
          </Grid>
      </Grid>
      </>
    )
  }


const mapDispatch = (dispatch) => {
  return {
    update: (username, firstName, lastName, email, address) => dispatch(updateProfile(username, firstName, lastName, email, address))
  }
}

const mapState = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapState, mapDispatch)(Profile)