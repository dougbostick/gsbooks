import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import products from './products'
import cartItem from './cart-item'
import users from './users'
import categories from './categories'
import authors from './authors'

const reducer = combineReducers({auth, products, cartItem, users, categories, authors})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './products'
export * from './cart-item'
export * from './users'
export * from './categories'
export * from './authors'


