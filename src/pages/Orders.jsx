import React, { useState } from "react";

function Orders({ isDarkMode }) {
  const clients = [
    {
      id: 1,
      name: "Client 1",
      address: "23, Nasr City, Cairo, Egypt",
      phone: "01012345678",
      orders: [
        {
          id: 1,
          productImage: "https://via.placeholder.com/80", // replace with actual image URL
          productName: "Black Shirt",
          orderNo: "345",
          color: "Black",
          size: "Large",
          quantity: 1,
          total: "500EGP",
          orderDate: "7/8/2024 02:00PM",
        },
        {
          id: 2,
          productImage: "https://via.placeholder.com/80", // replace with actual image URL
          productName: "White Shirt",
          orderNo: "345",
          color: "Black",
          size: "Large",
          quantity: 1,
          total: "350EGP",
          orderDate: "7/8/2024 02:00PM",
        },
      ],
    },
    {
      id: 2,
      name: "Client 2",
      address: "45, Zamalek, Cairo, Egypt",
      phone: "01098765432",
      orders: [
        {
          id: 3,
          productImage: "https://via.placeholder.com/80", // replace with actual image URL
          productName: "Red Jacket",
          orderNo: "346",
          color: "Red",
          size: "Medium",
          quantity: 2,
          total: "1200EGP",
          orderDate: "7/9/2024 03:00PM",
        },
        {
          id: 4,
          productImage: "https://via.placeholder.com/80", // replace with actual image URL
          productName: "Blue Jacket",
          orderNo: "346",
          color: "Blue",
          size: "Medium",
          quantity: 2,
          total: "1200EGP",
          orderDate: "7/9/2024 03:00PM",
        },
      ],
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");

  // Filter clients based on search query, but show all clients if the query is empty
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
              {client?.orders?.map((order, index) => (
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
