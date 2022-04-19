import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

// ** Product Reducer ** //
export default function (state = [], action) {
    if(action.type === 'LOAD_PRODUCTS') {
        return action.products;
    }
    return state;
}

export const loadProducts = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/products');
        dispatch({type: LOAD_PRODUCTS, products: response.data});
    };
};



