const initialState = {
    categories: [],
};

interface actionI {
    type: string;
    payload?: any;
}
const categoriesReducer = (state = initialState, action: actionI) => {
    switch (action.type) {
        case 'SETCATEGORIES': 
            return { ...state, categories: action.payload};
        default:
            return state;
    }
};

export default categoriesReducer;
