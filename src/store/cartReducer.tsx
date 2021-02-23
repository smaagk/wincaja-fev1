import { cartActionTypes } from '../action-types';

const initialState = {
    cart: [],
    total: 0,
    qtyTotal: 0,
};

interface actionI {
    type: string;
    payload: any;
}

interface IProducto {
    articulo: string;
    img?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
}
const cartReducer = (state = initialState, action: actionI) => {
    const item = action.payload;
    const total = state.total;
    const qtyTotal = state.qtyTotal;

    switch (action.type) {
        case 'ADDPRODUCT':
            return {
                ...state,
                cart: state.cart.concat({ ...action.payload, quantity: 1 }),
                total: total + item.price,
                qtyTotal: qtyTotal + 1,
            };
        case 'ADDQUANTITY':
            return {
                ...state,
                cart: state.cart.map((product: IProducto) =>
                    product.articulo === item.articulo
                        ? { ...product, quantity: Number(product.quantity) + 1 }
                        : product
                ),
                total: total + item.price,
                qtyTotal: qtyTotal + 1,
            };
        case 'ADDPRODUCTQUANTITY':
          console.log(action.payload);
            return {
                ...state,
                cart: state.cart.concat({ ...item.product, quantity: item.qty }),
                total: total + (item.product.price * item.qty ),
                qtyTotal: qtyTotal + item.qty,
            };
        case 'ADDQUANTITYNUMBER':
          return {
            ...state,
            cart: state.cart.map((product: IProducto) =>
                product.articulo === item.product.articulo
                    ? { ...product, quantity: Number(product.quantity) + item.qty }
                    : product
            ),
            total: total + (item.product.price * item.qty ),
            qtyTotal: qtyTotal + item.qty,
        }
        case 'SUBQUANTITY':
            return {
                ...state,
                cart: state.cart.map((product: IProducto) =>
                    product.articulo === item.articulo
                        ? { ...product, quantity: Number(product.quantity) - 1 }
                        : product
                ),
                total: Number(total) - item.price,
                qtyTotal: qtyTotal - 1,
            };
        case 'DELETEPRODUCT':
            return {
                ...state,
                cart: state.cart.filter(
                    (itm: IProducto) => itm.articulo !== item.articulo
                ),
                total: Number(total) - item.quantity * item.price,
                qtyTotal: qtyTotal - item.quantity,
            };
        case 'CLEANCART':
            return {
                ...initialState
            }
        default:
            return state;
    }
};

export default cartReducer;
