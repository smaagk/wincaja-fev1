import { Prices } from 'interfaces/prices.interfaces';
import _ from 'lodash';
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
    price: number;
    prices: Prices[]
    quantity: number;
}

function getPriceByRangeQty(prices: Prices[], qty: number) {
    /*Given a qty, find the price with the corresponding range
    Example: prices = [
          {
            Articulo: '7501001600105',
            PrecioIVA: 24.5,
            Precio: 24.5,
            IepsTasaVenta: 0,
            IVATasaVenta: 0,
            CantidadAutomatico: 0
          },
          {
            Articulo: '7501001600105',
            PrecioIVA: 23,
            Precio: 23,
            IepsTasaVenta: 0,
            IVATasaVenta: 0,
            CantidadAutomatico: 3
          },
          {
            Articulo: '7501001600105',
            PrecioIVA: 22.5,
            Precio: 22.5,
            IepsTasaVenta: 0,
            IVATasaVenta: 0,
            CantidadAutomatico: 48
          },
          {
            Articulo: '7501001600105',
            PrecioIVA: 19.583,
            Precio: 19.583,
            IepsTasaVenta: 0,
            IVATasaVenta: 0,
            CantidadAutomatico: 50000.016
          }
        ]
        qty = 10 price should be 23 because qty is between 3 and 48,
        qty = 1 price should be 24.5 because qty is less than 3,
        qty = 100 price should be 19.583 because qty is greater than 48
        */
    let price = 0;
    if (qty < prices[0].CantidadAutomatico) {
        price = prices[0].PrecioIVA;
    }

    if (qty > prices[prices.length - 1].CantidadAutomatico) {
        price = prices[prices.length - 1].PrecioIVA;
    }

    if (qty >= prices[0].CantidadAutomatico && qty <= prices[prices.length - 1].CantidadAutomatico) {
        for (let i = 0; i < prices.length; i++) {
            if (qty >= prices[i].CantidadAutomatico && qty <= prices[i + 1].CantidadAutomatico) {
                price = prices[i].PrecioIVA;
            }
        }
    }

    return price;
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
                total: total + action.payload.price,
                qtyTotal: qtyTotal + 1,
            };
        case 'ADDQUANTITY':
            return {
                ...state,
                cart: state.cart.map((product: IProducto) =>
                    product.articulo === item.articulo
                        ? { ...product, quantity: Number(product.quantity) + 1, price: getPriceByRangeQty(product.prices, Number(product.quantity) + 1) }
                        : product
                ),
                total: total + state.cart.find((product: IProducto) => product.articulo === item.articulo).price,
                qtyTotal: qtyTotal + 1,
            };
        case 'ADDPRODUCTQUANTITY':
          console.log(action.payload);
            return {
                ...state,
                cart: state.cart.concat({ ...item.product, quantity: item.qty, price: getPriceByRangeQty(item.product.prices, item.qty) }),
                qtyTotal: qtyTotal + item.qty,
            };
        case 'ADDQUANTITYNUMBER':
          return {
            ...state,
            cart: state.cart.map((product: IProducto) =>
                product.articulo === item.product.articulo
                    ? { ...product, quantity: Number(product.quantity) + item.qty, price: getPriceByRangeQty(product.prices, Number(product.quantity) + item.qty) }
                    : product
            ),
            qtyTotal: qtyTotal + item.qty,
        }
        case 'SUBQUANTITY':
            return {
                ...state,
                cart: state.cart.map((product: IProducto) =>
                    product.articulo === item.articulo
                        ? { ...product, quantity: Number(product.quantity) - 1, price: getPriceByRangeQty(product.prices, Number(product.quantity) - 1) }
                        : product
                ),
                qtyTotal: qtyTotal - 1,
            };
        case 'DELETEPRODUCT':
            return {
                ...state,
                cart: state.cart.filter(
                    (itm: IProducto) => itm.articulo !== item.articulo
                ),
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
