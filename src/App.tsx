import './App.css';

import MenuComponent from 'components/menu/menu';
import RegisterComponent from 'components/register/register.component';
import { SearchInputComponent } from 'components/ui-components/search-input/search-input.component';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomeAdmin from './components/admin/home-admin';
import Basket from './components/basket/basket';
import BuyProcessComponent from './components/buy-process/buy-process';
import Catalog from './components/catalog/catalog';
import Home from './components/home';
import Login from './components/login/login';
import PaymentComponent from './components/payment/payment.component';
import ProductCard from './components/ui-components/product-card/product-card';
import AuthAdmin from './guards/auth-guard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Catalog} exact />
        <AuthAdmin path="/admin" component={HomeAdmin} />
        <Route path="/login" component={Login} exact />
        <Route path="/tienda" component={Catalog} />
        <Route path="/debug" component={RegisterComponent} />
      </div>
    </BrowserRouter>
  );
}

export default App;
