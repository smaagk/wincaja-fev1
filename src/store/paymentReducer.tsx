const initialState = {
    source_id: '',
    device_session_id: '',
    metodoPago:  ''
};

interface actionI {
    type: string;
    payload: any;
}

const paymentReducer = (state = initialState, action: actionI) => {
    const data = action.payload;

    switch (action.type) {
        case 'SETSOURCEID':
            return { ...state, source_id: data };
        case 'SETDEVICE':
            return { ...state, device_session_id: data };
        case 'SETMETHOD':
            return { ...state, metodoPago: data };
        default:
            return state;
    }
};

export default paymentReducer;
