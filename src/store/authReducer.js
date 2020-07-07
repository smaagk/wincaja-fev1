const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.usuario,
				token: action.payload.token,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
			};
		default:
			return state;
	}
};

export default authReducer;
