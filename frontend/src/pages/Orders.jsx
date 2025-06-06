import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/AppContext';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + '/api/order/userOrders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 md:px-16 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold text-center mb-10 text-gray-800">
        MY ORDERS
      </div>

      <div className="space-y-6">
        {orderData.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 border border-gray-200"
            >
              {/* Product Image */}
              <div className="w-full md:w-1/4 flex-shrink-0">
                <img
                  src={item.image[0]}
                  alt={item.name || 'Product'}
                  className="w-full h-40 object-contain rounded-md"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Price:</span> {currency}{item.price}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Quantity:</span> {item.quantity || 1}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Payment:</span> {item.payment} via {item.paymentMethod}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span> {item.status}
                </p>
              </div>

              {/* Track Button */}
              <div className="w-full md:w-[150px] flex justify-start md:justify-end mt-4 md:mt-0">
                <button className="px-4 py-2 border rounded-full hover:bg-blue-600 hover:text-white transition-all text-sm font-medium">
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
