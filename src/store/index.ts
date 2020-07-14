import  authReducer  from './authReducer'
import  cartReducer  from './cartReducer'
import  stepsReducer from './stepsReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  step: stepsReducer
})

export type RootState = ReturnType<typeof rootReducer>