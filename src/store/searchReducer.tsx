const initialState = {
  searchValue: ''
};

interface actionI {
  type: string;
  payload: any;
}

const searchReducer = (state = initialState, action: actionI) => {
  const data = action.payload;

  switch (action.type) {
    case 'SETSEARCH':
      return { searchValue: data };
    case 'SETSIMPLESEARCH':
      return { simpleSearchValue: data };
    default:
      return state;
  }
};

export default searchReducer;