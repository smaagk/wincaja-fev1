const initialState = {
    almacen: 0,
};

interface actionI {
    type: string;
    payload?: any;
}
const almacenReducer = (state = initialState, action: actionI) => {
    switch (action.type) {
        case 'SELECTALMACEN': 
            return { almacen: action.payload };
        default:
            return state;
    }
};

export default almacenReducer;
