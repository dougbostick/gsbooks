import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProducts} from '../store/products'

class AddProduct extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            author: '',
            price: '',
            categoryId: ''
        }
        this.submit = this.submit.bind(this)
    }
    
    submit(ev) {
        ev.preventDefault()
        const { name, author, price, categoryId } = this.state
        
        const product = {
            name, author, price, categoryId
        }
        
        this.props.add(product)
    }
    
    
    render() {
        const { submit } = this
        const { categories } = this.props
        const { name, author, price, categoryId } = this.state
        return (
            <form onSubmit={ submit }> 
                <input onChange={ev => this.setState({name: ev.target.value})} name='name' value={name} placeholder='Product Name' />
                <input onChange={ev => this.setState({author: ev.target.value})} name='author' value={author} placeholder='Product Author' />
                <input onChange={ev => this.setState({price: ev.target.value})} name='price' value={price} placeholder='Product Price' />
                <select value={ categoryId } name='categoryId' onChange={ ev => this.setState({ categoryId: ev.target.value })}>
                        <option value=''> Select A Category </option>
                    {
                        categories.map(  category => {
                            return (
                                <option value={category.id} key={category.id}> { category.name }</option>
                            )
                        })
                    }
                    </select>
                 <button disabled={!name || !author || !price || !categoryId }>Add Product</button>
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

export default connect(state => state, mapDispatchToProps)(AddProduct)