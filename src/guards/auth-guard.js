import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
function AuthAdmin({ component: Component, ...rest }) {
	const guard = useSelector((state) => state.auth);
	return (
		<Route
			{...rest}
			render={(props) =>
				guard.isAuthenticated && guard.user.role === 'admin' ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
}
export default AuthAdmin;
