import React from 'react'
import {connect} from 'react-redux'

const PastOrders = ({auth, cartItem, products}) => {
    return (
        <div>
            <h1> {auth.username}'s past orders </h1>
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