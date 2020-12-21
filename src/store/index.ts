import authReducer from './authReducer';
import cartReducer from './cartReducer';
import stepsReducer from './stepsReducer';
import { combineReducers } from 'redux';
import addressReducer from './addressReducer';
import searchReducer from './searchReducer';
import paymentReducer from './paymentReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    step: stepsReducer,
    address: addressReducer,
    search: searchReducer,
    payment: paymentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
