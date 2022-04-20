import axios from 'axios'

const ADD_CARTITEM = 'ADD_CARTITEM'

export default function cartItem(state = [], action) {
    if(action.type === 'ADD_CARTITEM') {
        return [...state, action.cartItem] // if there is an issue maybe look here??? -GS
    }
    return state;
}

export const addCartItem = (cartItem) => {
    return async(dispatch) => {
        let response = await axios.post('/api/cartItem', cartItem)
        dispatch({type: ADD_CARTITEM, cartItem: response.data})
    }
}