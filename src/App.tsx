import './App.css';

import AccessComponent from 'components/access/acccess';
import RegisterComponent from 'components/register/register.component';
import TypeaHead from 'components/typeahead/typeahead';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomeAdmin from './components/admin/home-admin';
import Catalog from './components/catalog/catalog';
import AuthAdmin from './guards/auth-guard';
import AuthClient from 'guards/client-guard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthClient path="/" component={Catalog} exact />
        <AuthAdmin path="/admin" component={HomeAdmin} />
        <Route path="/login" component={AccessComponent} exact />
        <AuthClient path="/tienda" component={Catalog} />
        <Route path="/debug" component={TypeaHead} />
      </div>
    </BrowserRouter>
  );
}

export default App;
