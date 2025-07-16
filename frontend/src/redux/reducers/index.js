import { combineReducers } from 'redux'
import Auth from './auth';
import Alert from './alert';
import Categories from './categories';
import Products from './products';
import Cart from './cart';
import Shipping from './shipping';
import Payment from './payment';


// Ejemplo: un reducer vacío
const dummyReducer = (state = {}) => {
  return state
}

const rootReducer = combineReducers({
  dummy: dummyReducer,
  Auth,
  Alert,
  Categories,
  Products,
  Cart,
  Shipping,
  Payment
})

export default rootReducer;