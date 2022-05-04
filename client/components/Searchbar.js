import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Searchbar extends Component {
    constructor() {
        super() 
      this.state = {
          value: ''
      }
    }
    
    render() {
        const {value} = this.state
        return (
        <form>
            <input name='value' value={value} onChange={(ev) => this.setState({value: ev.target.value})} placeholder="Search"/>
            <Link to={{pathname: '/searchTerm', state: {searchTerm:value}}}> Search </Link>
        </form>
            )
    }
}