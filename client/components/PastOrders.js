import React from 'react'
import {connect} from 'react-redux'

const PastOrders = ({auth, cartItem, products}) => {
    return (
        <div>
            <h2> {auth.username}'s Past Orders </h2>
            {cartItem.map(item => {
                return (
                item.purchased === true ? 
                    <div key={item.id}> 
                        <p>Product: {products.find(product => product.id === item.productId).name} </p>
                        <p>Quantity: {item.quantity}</p>
                    </div> : null
                )
            })
            }
        </div>
        )
}


export default connect(state => state)(PastOrders)