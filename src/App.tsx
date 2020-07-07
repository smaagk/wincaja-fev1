import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login/login';
import HomeAdmin from './components/admin/home-admin';
import AuthAdmin from './guards/auth-guard';
import './App.css';
import ProductCard from './components/ui-components/product-card/product-card';
import Home from './components/home';
import Basket from './components/basket/basket'
import PaymentComponent from './components/payment/payment.component'



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Home} exact />
        <AuthAdmin path="/admin" component={HomeAdmin} />
        <Route path="/login" component={Login} exact />
        <Route path="/test_component" component={Basket}  />
      </div>
    </BrowserRouter>
  );
}

export default App;
