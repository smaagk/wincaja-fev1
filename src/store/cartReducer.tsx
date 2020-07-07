import { cartActionTypes } from '../action-types';

const initialState = {
  cart: [],
  total: 0,
};

interface actionI {
  type: string;
  payload: any;
}

interface IProducto {
  articulo: string;
  img: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
}
const cartReducer = (state = initialState, action: actionI) => {
  const item = action.payload;
  const total = state.total
  switch (action.type) {
    case 'ADDPRODUCT':
      return {
        ...state,
        cart: state.cart.concat({ ...action.payload, quantity: 1 }),
        total : total + item.price
      };
    case 'ADDQUANTITY':
      return {
        ...state,
        cart: state.cart.map((product: IProducto) =>
          product.articulo === item.articulo
            ? { ...product, quantity: Number(product.quantity) + 1 }
            : product
        ),
        total : total + item.price
      };
    case 'SUBQUANTITY':
      return {
        ...state,
        cart: state.cart.map((product: IProducto) =>
          product.articulo === item.articulo
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product
        ),
        total: Number(total) - item.price
      };
    case 'DELETEPRODUCT':
      return {
        ...state,
        cart: state.cart.filter((itm: IProducto) => itm.articulo !== item.articulo)
      };
    default:
      return state;
  }
};

export default cartReducer;
