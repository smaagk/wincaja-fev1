const initialState = {
  step: 0,
};

interface actionI {
  type: string;
  payload?: any;
}
const stepsReducer = (state = initialState, action: actionI) => {
  switch (action.type) {
    case 'NEXT':
      return { step: state.step + 1 };
    case 'BACK':
      return { step: state.step - 1 };
    case 'STEP':
      return { step: action.payload };
    default:
      return state;
  }
};

export default stepsReducer;
