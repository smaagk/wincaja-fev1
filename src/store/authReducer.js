import { RotateLeftSharp } from "@material-ui/icons";
import { ROLES } from 'constants/app.constants';
const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			const usuario = action.payload.usuario;

			if (usuario.role === ROLES.CLIENT) {
				window.location.href = '/tienda';
			}
			return {
				...state,
				isAuthenticated: true,
				user: usuario,
				token: action.payload.token,
			};
		case 'LOGOUT':
			localStorage.clear();
			window.location.href = '/tienda/home';
			
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
