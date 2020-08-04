import  authReducer  from './authReducer'
import  cartReducer  from './cartReducer'
import  stepsReducer from './stepsReducer'
import { combineReducers } from 'redux'
import addressReducer from './addressReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  step: stepsReducer,
  address: addressReducer
})

export type RootState = ReturnType<typeof rootReducer>