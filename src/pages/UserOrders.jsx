import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

const UserOrders = ({ isDarkMode }) => {
  const { userId } = useParams(); // Extract userId from the route params
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState(""); // State to store the user's name

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`orders/getUserOrders/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const ordersData = response.data.data.map((order) => {
          const products = order.products.map((product) => ({
            productImage: `${import.meta.env.VITE_MAIN_URL}${
              product.product.colors[0]?.image
            }`,
            productName: product.product.name,
            color: product.color,
            size: product.size,
            quantity: product.quantity,
          }));

          // Set the user's name from the first order (assuming all orders belong to the same user)
          if (!userName && order.user?.name) {
            setUserName(order.user.name);
          }

          return {
            id: order._id,
            products,
            total: `${order.total_order_price} EGP`,
            orderDate: new Date(order.createdAt).toLocaleString(),
            orderNo: order.order_number,
            address: `${order.street}, ${order.city}, ${order.governate}`,
            phoneNumber: order.user.phoneNumber,
          };
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [userId, userName]); // Add userName as a dependency to avoid setting it multiple times

  return (
    <div
      className={`w-full mx-auto p-4 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <h1
        className={`font-bold text-3xl ${
          isDarkMode ? "text-amber-500" : "text-amber-800"
        }`}
      >
        {userName}'s Orders
      </h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={order.id} className="mb-8">
            <div
              className={`rounded-lg shadow-md p-4 w-full ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-amber-500" : "text-amber-900"
                }`}
              >
                Order n.o {order.orderNo}
              </h2>
              <div className="text-sm mb-4">
                <span
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {order.orderDate}
                </span>
              </div>
              {order.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="flex items-center">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3
                        className={`text-md font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {product.productName}
                      </h3>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <div>Color: {product.color}</div>
                        <div>Size: {product.size}</div>
                        <div>Quantity: {product.quantity}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-md font-semibold ${
                      isDarkMode ? "text-amber-500" : "text-amber-900"
                    }`}
                  >
                    {order.total}
                  </div>
                </div>
              ))}
              <div
                className={`mt-4 text-right ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div>Address: {order.address}</div>
                <div>Phone: {order.phoneNumber}</div>
              </div>
            </div>
            {index !== orders.length - 1 && (
              <hr
                className={`${
                  isDarkMode ? "border-gray-700" : "border-amber-800"
                } mt-4`}
              />
            )}
          </div>
        ))
      ) : (
        <div className="text-center">
          <h2
            className={`text-xl font-semibold mb-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No orders found.
          </h2>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
