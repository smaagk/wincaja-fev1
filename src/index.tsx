import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import authReducer from './store/authReducer';
import cartReducer from './store/cartReducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux'

import { loadState, saveState } from './store/localStorage';
import { rootReducer } from './store/index'
const persistedStore = loadState();
const store = createStore(rootReducer, persistedStore, composeWithDevTools());

store.subscribe( () => {
  saveState(store.getState())
})
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
