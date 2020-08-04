import { IAddress } from '../components/addresses/addAddressComponent/validate-address';

const initialState = {
  addresses: [],
  addressKey: '',
};

interface actionI {
  type: string;
  payload: any;
}

const addressReducer = (state = initialState, action: actionI) => {
  const data = action.payload;
  switch (action.type) {
    case 'SELECTADDRESS':
      return { ...state, addressKey: data };
    case 'SETADDRESSES':
      return { ...state, addresses: data };
    case 'DELETEADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter((address: IAddress) => {
          return address.alias !== data;
        }),
      };
    case 'ADDADDRESS':
      return {
        ...state,
        addresses: state.addresses.concat(data)
      };
    default:
      return state;
  }
};

export default addressReducer;
