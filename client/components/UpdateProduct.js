import React from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../store/products';

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product ? this.props.product.name : '',
      price: this.props.product ? this.props.product.price : ''
    }
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.product && this.props.product) {
      this.setState({ name: this.props.product.name, price: this.props.product.price })
    }
  }

  render() {
    const { name, price } = this.state;

    return (
      <div>
        <h3> Update Product </h3>
        <form onSubmit={ (ev) => {
          ev.preventDefault();
          this.props.update(this.state);
        }}>
          <input
            placeholder='Product Name'
            value={ name }
            name='name'
            onChange={ ev => this.setState({ name: ev.target.value })}
          />
          <input
            placeholder='Product Price'
            value={ price }
            name='price'
            onChange={ ev => this.setState({ price: ev.target.value })}
          />
          <button type='submit'>
            Update Product
          </button>
        </form>
      </div>
    )
  }
};

const mapStateToProps = (state, { match }) => {
  const products = state.products
  const product = products.find(product => product.id === match.params.id*1);
  return {
    product
  }
}

const mapDispatchToProps = (dispatch, { match, history }) => {
  return {
    update: (product) => {
      product = { ...product, id: match.params.id}
      dispatch(updateProduct(product, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);