import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function AuthAdmin({ component: Component, ...rest }) {
    const guard = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                guard.isAuthenticated && guard.user.role === 'admin' ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}
export default AuthAdmin;
