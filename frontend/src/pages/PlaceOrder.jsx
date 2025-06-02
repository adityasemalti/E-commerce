import React, { useContext, useState } from 'react';
import axios from 'axios'; // ✅ Import axios
import CartTotal from '../components/CartTotal';
import AppContext from '../Context/AppContext';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products
  } = useContext(AppContext);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(product => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems)

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            {
              headers: { token } // ✅ Corrected from "Headers"
            }
          );

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          toast.error('Please select a valid payment method.');
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to place the order. Please try again.');
    }
  };

  return (
    // Inside your <form> return block
<form
  className="flex flex-col lg:flex-row justify-between px-4 sm:px-6 py-10 gap-10"
  onSubmit={handlePlaceOrder}
>
  {/* ------ Left Side: Delivery Information ------ */}
  <div className="flex flex-col w-full lg:w-1/2 gap-6">
    <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Delivery Information</h1>

    <div className="flex flex-col md:flex-row gap-4">
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={onChangeHandler}
        className="input-field"
      />
      <input
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={onChangeHandler}
        className="input-field"
      />
    </div>

    <input
      name="email"
      type="email"
      placeholder="E-mail Address"
      value={formData.email}
      onChange={onChangeHandler}
      className="input-field"
    />

    <input
      name="street"
      type="text"
      placeholder="Street"
      value={formData.street}
      onChange={onChangeHandler}
      className="input-field"
    />

    <div className="flex flex-col md:flex-row gap-4">
      <input
        name="city"
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={onChangeHandler}
        className="input-field"
      />
      <input
        name="state"
        type="text"
        placeholder="State"
        value={formData.state}
        onChange={onChangeHandler}
        className="input-field"
      />
    </div>

    <div className="flex flex-col md:flex-row gap-4">
      <input
        name="country"
        type="text"
        placeholder="Country"
        value={formData.country}
        onChange={onChangeHandler}
        className="input-field"
      />
      <input
        name="zipCode"
        type="text"
        placeholder="Zip Code"
        value={formData.zipCode}
        onChange={onChangeHandler}
        className="input-field"
      />
    </div>

    <input
      name="phone"
      type="text"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={onChangeHandler}
      className="input-field"
    />
  </div>

  {/* ------ Right Side: Payment and Summary ------ */}
  <div className="w-full lg:w-1/2 flex flex-col gap-6">
    <h1 className="text-2xl sm:text-3xl font-semibold text-center">Payment Method</h1>

    <div className="flex flex-col gap-4 border border-gray-300 rounded p-4">
      {['cod', 'card', 'upi'].map((option) => (
        <label key={option} className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            value={option}
            checked={method === option}
            onChange={() => setMethod(option)}
          />
          <span className="capitalize">{option === 'cod' ? 'Cash on Delivery' : option}</span>
        </label>
      ))}
    </div>

    <div className="flex flex-col items-center w-full">
      <CartTotal />
      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded-md w-full sm:w-1/2 lg:w-1/3 mt-5 transition hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  </div>
</form>

  );
};

export default PlaceOrder;
