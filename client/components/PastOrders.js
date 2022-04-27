import React from 'react'
import {connect} from 'react-redux'



const PastOrders = ({auth}) => {
    return (
        <div>
            <h1> {auth.username}'s past orders </h1>
        </div>
        )
}


export default connect(state => state)(PastOrders)