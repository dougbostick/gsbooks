import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';

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
        <div className='searchForm'>
                <input name='value' value={value} onChange={(ev) => this.setState({value: ev.target.value})} placeholder="Search"/>
                <button className='searchIcon'> <Link to={{pathname: '/searchTerm', state: {searchTerm:value}}}> <SearchIcon style={{color: 'grey'}}/> </Link> </button>
        </div>

            )
    }
}