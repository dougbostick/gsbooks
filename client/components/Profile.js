import React, { Component } from 'react';
import {connect} from 'react-redux'
import {updateProfile} from '../store';
import PastOrders from './PastOrders';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: this.props.auth.username,
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
      email: this.props.auth.email,
      address: this.props.auth.address,
      error: ''
    }
  }
  async save(ev){
    ev.preventDefault()
    try{
      await this.props.update(this.state.username)
      console.log(this.state);
    }
    catch(err){
      console.log({err})
      this.setState({ error: err.response.data })
    }
  }
  render() {
    const { username, firstName, lastName, email, address, error } = this.state;
    return(
      <div>
        <h2> My Account </h2>
        <h3> </h3> 
        <h3> Edit Your Personal Details </h3>
         <form onSubmit={ ev => this.save(ev)}>
          { error }
          <input value={username} onChange={ev => this.setState({ username: ev.target.value})} />
          <input value={firstName} onChange={ev => this.setState({ firstName: ev.target.value})} />
          <input value={lastName} onChange={ev => this.setState({ lastName: ev.target.value})} />
          <input value={email} onChange={ev => this.setState({ email: ev.target.value})} />
          <input value={address} onChange={ev => this.setState({ address: ev.target.value})} />

          <button> Update Details </button>
        </form>

        <PastOrders />
      </div>
    )
  }
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