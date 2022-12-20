import React from 'react';

export type CartDetailsProps = {
  cart: {
    articulo: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  qtyTotal: number;
  onQuantityChange: (articulo: string, quantity: number) => void;
};

const CartDetails: React.FC<CartDetailsProps> = ({ cart, total, qtyTotal, onQuantityChange }) => {
  const handleQuantityChange = (articulo: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    onQuantityChange(articulo, newQuantity);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalles del carrito</h1>
      {cart.map(item => (
        <div key={item.articulo} className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <div className="p-4 flex justify-between">
            <div className="font-bold text-xl">{item.name}</div>
            <div>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                Eliminar
              </button>
            </div>
          </div>
          <div className="p-4 flex justify-between">
            <div>{item.description}</div>
            <div>${item.price}</div>
          </div>
          <div className="p-4 flex justify-between">
            <div>
              <label htmlFor={`quantity-${item.articulo}`}>Cantidad:</label>
              <input
                id={`quantity-${item.articulo}`}
                type="number"
                min="1"
                value={item.quantity}
                onChange={event => handleQuantityChange(item.articulo, event)}
              />
            </div>
            <div>${item.price * item.quantity}</div>
          </div>
        </div>
      ))}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 p-4">
        <div className="font-bold text-xl">Total</div>
        <div className="text-5xl font-bold">${total}</div>
      </div>
    </div>
  );
};

export default CartDetails;