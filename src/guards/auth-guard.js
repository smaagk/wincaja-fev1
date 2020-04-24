import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
function Auth({ component: Component, ...rest }) {
  const guard = useSelector(state => state);
  console.log(guard);
  return (
    <Route
      {...rest}
      render={props =>
        guard.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default Auth;
