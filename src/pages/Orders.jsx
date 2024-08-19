import React, { useState, useEffect } from "react";
import axios from "axios";

function Orders({ isDarkMode }) {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.50:3000/api/orders/allOrders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const ordersData = response.data.data;

        // Map the orders data to the required format
        const formattedClients = ordersData?.map((order) => ({
          id: order._id,
          name: order.user.name,
          address: `${order.street}, ${order.city}, ${order.governate}`,
          phone: order.user.phoneNumber,
          orders: order.products.map((product) => ({
            id: product._id,
            productImage: `http://192.168.0.50:3000/api/${product.product.colors[0].image}`, // Replace with actual base URL
            productName: product.product.name,
            orderNo: order.order_number,
            color: product.color,
            size: product.size,
            quantity: product.quantity,
            total: `${product.total_price} EGP`,
            orderDate: new Date(order.createdAt).toLocaleString(),
          })),
        }));

        setClients(formattedClients);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Filter clients based on search query
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`w-full mx-auto p-4 ${
        isDarkMode ? "text-gray-200" : "bg-light-bg text-dark-text"
      }`}
    >
      <div className="heading flex justify-between items-center mb-4">
        <h1
          className={`font-bold text-3xl ${
            isDarkMode ? "text-amber-500" : "text-amber-800"
          }`}
        >
          Orders
        </h1>
        <input
          type="text"
          placeholder="Search client..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`border rounded px-4 py-2 ${
            isDarkMode
              ? "border-gray-600 bg-gray-800 text-gray-200"
              : "border-gray-300"
          }`}
        />
      </div>

      {clients.length > 0 ? (
        filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div key={client.id} className="mb-8">
              <div
                className={`text-lg font-bold mb-4 ${
                  isDarkMode ? "text-amber-500" : "text-amber-800"
                }`}
              >
                {client.name}
              </div>
              {client.orders.map((order, index) => (
                <div key={order.id}>
                  <div
                    className={`rounded-lg shadow-md p-4 w-full ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="flex">
                      <img
                        src={order.productImage}
                        alt="Product"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <h2
                            className={`text-lg font-semibold ${
                              isDarkMode ? "text-amber-500" : "text-amber-900"
                            }`}
                          >
                            {order.productName}
                          </h2>
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {order.orderDate}
                          </span>
                        </div>
                        <div
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Order n.o {order.orderNo}
                        </div>
                        <div
                          className={`mt-2 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <div>Color: {order.color}</div>
                          <div>Size: {order.size}</div>
                          <div>Quantity: {order.quantity}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3
                        className={`font-semibold ${
                          isDarkMode ? "text-amber-500" : "text-amber-900"
                        }`}
                      >
                        Info
                      </h3>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        <p>{client.address}</p>
                        <p>📞 {client.phone}</p>
                      </div>
                    </div>
                    <div className="mt-4 text-right">
                      <span
                        className={`text-xl font-semibold ${
                          isDarkMode ? "text-amber-500" : "text-amber-900"
                        }`}
                      >
                        {order.total}
                      </span>
                    </div>
                  </div>
                  {index !== client.orders.length - 1 && (
                    <hr
                      className={`${
                        isDarkMode ? "border-gray-700" : "border-amber-800"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center">
            <h2
              className={`text-xl font-semibold mb-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No clients match your search.
            </h2>
          </div>
        )
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
}

export default Orders;
