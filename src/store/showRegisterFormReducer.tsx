const initialValue = {
    showRegisterForm: false,
};

interface actionI {
    type: string;
    payload?: any;
}

const showRegisterFormReducer = (state = initialValue, action: actionI) => {
    switch (action.type) {
        case 'SHOW_REGISTER_FORM':
            return {
                showRegisterForm: true
            };
        case 'HIDE_REGISTER_FORM':
            console.log('ocultar')
            return {
                showRegisterForm: false
            };
        default:
            return state;
    }
};

export default showRegisterFormReducer;
