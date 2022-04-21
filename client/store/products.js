import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// ** Product Reducer ** //
export default function (state = [], action) {
    if(action.type === 'LOAD_PRODUCTS') {
        return action.products;
    }
    
    if(action.type === 'ADD_PRODUCT') {
        return [...state, action.product]
    }
    
    if(action.type === 'DELETE_PRODUCT') {
        return state.filter(product => product.id !== action.product.id)
    }
    
    if(action.type === 'UPDATE_PRODUCT') {
         return state.map(product => product.id === action.product.id ? action.product : product)
     }
     
    return state;
}

export const loadProducts = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/products');
        dispatch({type: LOAD_PRODUCTS, products: response.data});
    };
};

export const addProducts = (product) => {
    return async(dispatch) => {
        const response = await axios.post('/api/products', product);
        dispatch({type: ADD_PRODUCT, products: response.data})
    }
}

export const deleteProduct = (product) => {
    return async(dispatch) => {
        const response = await axios.delete(`/api/products/${product.id}`)
        dispatch({type: DELETE_PRODUCT, product})
    }
}

export const updateProduct = (product) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/products/${product.id}`)
        dispatch({type: DELETE_PRODUCT, product})
    }
}

