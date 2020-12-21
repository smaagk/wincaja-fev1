import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login/login';
import HomeAdmin from './components/admin/home-admin';
import AuthAdmin from './guards/auth-guard';
import './App.css';
import ProductCard from './components/ui-components/product-card/product-card';
import Home from './components/home';
import Basket from './components/basket/basket';
import PaymentComponent from './components/payment/payment.component';
import BuyProcessComponent from './components/buy-process/buy-process';
import Catalog from './components/catalog/catalog';
import MenuComponent from 'components/menu/menu';
import { SearchInputComponent } from 'components/ui-components/search-input/search-input.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Catalog} exact />
        <AuthAdmin path="/admin" component={HomeAdmin} />
        <Route path="/login" component={Login} exact />
        <Route path="/tienda" component={Catalog} />
        <Route path="/debug" component={BuyProcessComponent} />
      </div>
    </BrowserRouter>
  );
}

export default App;
