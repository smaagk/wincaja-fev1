import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import CartDetails, { CartDetailsProps } from './CartDetails';

const Cart = () => {

    const cartItems: CartDetailsProps = useSelector((state: RootState) => state.cart);
  
    return (
        <div>
            <CartDetails {...cartItems} />
        </div>
    );
};

export default Cart;