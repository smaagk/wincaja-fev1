import { combineReducers } from 'redux';

import addressReducer from './addressReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import categoriesReducer from './catReducer';
import drawerReducer from './drawerReducer';
import paymentReducer from './paymentReducer';
import searchReducer from './searchReducer';
import stepsReducer from './stepsReducer';
import showRegisterFormReducer from './showRegisterFormReducer';
import almacenReducer from './almacenReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    drawer: drawerReducer,
    step: stepsReducer,
    address: addressReducer,
    search: searchReducer,
    payment: paymentReducer,
    almacen: almacenReducer,
    showRegisterForm: showRegisterFormReducer
});

export type RootState = ReturnType<typeof rootReducer>;
