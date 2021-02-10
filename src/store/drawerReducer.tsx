const initialState = {
    isOpen: false,
};

interface actionI {
    type: string;
    payload?: any;
}
const drawerReducer = (state = initialState, action: actionI) => {
    switch (action.type) {
        case 'DRAWER': 
            return { isOpen: !state.isOpen };
        case 'HIDEDRAWER':
            return { isOpen: false };
        default:
            return state;
    }
};

export default drawerReducer;
