import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProducts} from '../store/products'

class AddProduct extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            price: ''
        }
        this.submit = this.submit.bind(this)
    }
    
    submit(ev) {
        ev.preventDefault()
        const {name,price} = this.state
        
        const product = {
            name, price
        }
        
        this.props.add(product)
    }
    
    
    render() {
        const {submit} = this
        const {name, price} = this.state
        return (
            <form onSubmit={submit}> 
                <input onChange={ev => this.setState({name: ev.target.value})} name='name' value={name} placeholder='Product Name' />
                <input onChange={ev => this.setState({price: ev.target.value})} name='price' value={price} placeholder='Product Price' />
                 <button disabled={!name || !price }>Add Product</button>
            </form>
            )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      add: async(product) => {
          await dispatch(addProducts(product))
      }
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)