import  authReducer  from './authReducer'
import  cartReducer  from './cartReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>