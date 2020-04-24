import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login/login";
import Productos from "./components/products/products";
import Auth from "./guards/auth-guard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={ Home } exact />
        <Auth path="/productos" component={ Productos } exact />
        <Route path="/login" component={ Login } exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
