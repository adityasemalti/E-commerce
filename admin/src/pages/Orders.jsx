import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/allorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h3 className="text-4xl font-bold mb-12 text-center text-gray-800">Orders</h3>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md overflow-hidden border border-gray-200"
            >
              {/* Order Header */}
              <div className="flex p-4 space-x-4">
                <img
                  src={order.items[0]?.image[0] || 'https://via.placeholder.com/150'}
                  alt="Order Item"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-gray-600 font-semibold mb-2">
                    <span className="text-gray-800">Order ID:</span> {order._id}
                  </p>
                  <p className="text-gray-600 font-semibold mb-2">
                    <span className="text-gray-800">Date:</span>{' '}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    <span className="text-gray-800">Status:</span> {order.status}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <h4 className="text-lg font-semibold mb-2">Items</h4>
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-gray-700 py-2 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: <span className="font-medium">{item.size}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p>
                        Qty: <span className="font-medium">{item.quantity}</span>
                      </p>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
