import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/AppContext';
import '../App.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems,updateQuantity,navigate } = useContext(AppContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <h1 className='newFont text-5xl text-center'>
        Your Cart-----
      </h1>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='mx-10 mt-10 py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr]'>
              <div className='flex items-start gap-6'>
                <img src={productData.image[0]} alt="" className='w-1/4' />
                <div className='w-full'>
                  <p className='text-lg font-semibold'>{productData.name}</p>
                  <div className='flex justify-between items-center'>
                  <p>Size: {item.size}</p>
                    <div className='flex gap-2'>
                  <p>Quantity-</p><input onChange={(e)=>e.target.value === '' || e.target.value==='0' ?null : updateQuantity(item._id,item.size,Number(e.target.value))} type="number" name="" id="" defaultValue={productData.quantity} className='border w-14 text-center'/>
                  </div>
              <div>
                <RiDeleteBin6Line size={20} className='cursor-pointer' onClick={()=>updateQuantity(item._id, item.size,0)}/>
              </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full flex flex-col items-center'>
          <CartTotal/>
          <button onClick={()=>{navigate('/place-order')}} className='border bg-black py-2 px-3 text-white rounded-sm w-1/4 my-5'>Proceed to Checkout</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
