import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';

const CartTotal = () => {
  const { getCartAmount, currency, deliveryFee } = useContext(AppContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
      <h1 className="text-3xl font-bold text-center text-gray-800">Cart Totals</h1>

      <div className="flex flex-col gap-3 text-base text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency}{subtotal}.00</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{currency}{deliveryFee}</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-lg text-gray-900">
          <span>Total</span>
          <span>{currency}{total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
