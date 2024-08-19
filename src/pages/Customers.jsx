import React, { useState } from "react";

const customers = [
  {
    name: "Esther Howard",
    emailSubscription: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: "$2500.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Leslie Alexander",
    emailSubscription: "Not subscribed",
    location: "Pasadena, Oklahoma",
    orders: "3 Orders",
    amountSpent: "$3500.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Guy Hawkins",
    emailSubscription: "Pending",
    location: "Corona, Michigan",
    orders: "N/A",
    amountSpent: "$0.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Savannah Nguyen",
    emailSubscription: "Subscribed",
    location: "Syracuse, Connecticut",
    orders: "N/A",
    amountSpent: "$0.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Bessie Cooper",
    emailSubscription: "Not subscribed",
    location: "Lansing, Illinois",
    orders: "1 Orders",
    amountSpent: "$470.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Ronald Richards",
    emailSubscription: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: "$2500.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Marvin McKinney",
    emailSubscription: "Subscribed",
    location: "Coppell, Virginia",
    orders: "2 Orders",
    amountSpent: "$1500.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Kathryn Murphy",
    emailSubscription: "Not subscribed",
    location: "Lafayette, California",
    orders: "3 Orders",
    amountSpent: "$2500.00",
    imgSrc: "https://via.placeholder.com/40",
  },
  {
    name: "Eleanor Pena",
    emailSubscription: "Pending",
    location: "Corona, Michigan",
    orders: "1 Orders",
    amountSpent: "$2500.00",
    imgSrc: "https://via.placeholder.com/40",
  },
];

const Customers = ({ isDarkMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the number of pages based on the filtered customers
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Determine the items to display for the current page
  const currentItems = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div
      className={`container mx-auto p-4 ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      <div className="heading flex justify-between mt-4 mb-8">
        <h1
          className={`font-bold text-3xl ${
            isDarkMode ? "text-amber-500" : "text-amber-800"
          }`}
        >
          Customers
        </h1>
        <div
          className={`flex items-center border rounded-lg p-1 ${
            isDarkMode ? "border-gray-600" : "border-gray-400"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={`bg-transparent outline-none border-none w-full text-sm p-2 ${
              isDarkMode ? "text-light-text" : "text-gray-800"
            }`}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredCustomers.length === 0 ? (
          <div
            className={`text-center font-bold py-10 ${
              isDarkMode ? "text-amber-500" : "text-amber-800"
            }`}
          >
            No users found
          </div>
        ) : (
          <table
            className={`min-w-full text-center shadow-md rounded-lg ${
              isDarkMode ? "bg-dark-card" : "bg-white"
            }`}
          >
            <thead>
              <tr>
                <th
                  className={`px-6 py-3 font-bold text-left text-md uppercase tracking-wider ${
                    isDarkMode
                      ? "bg-amber-800 text-light-text"
                      : "bg-amber-900 text-white"
                  }`}
                >
                  Customers
                </th>
                <th
                  className={`px-6 py-3 font-bold text-center text-md uppercase tracking-wider ${
                    isDarkMode
                      ? "bg-amber-800 text-light-text"
                      : "bg-amber-900 text-white"
                  }`}
                >
                  Email
                </th>
                <th
                  className={`px-6 py-3 font-bold text-center text-md uppercase tracking-wider ${
                    isDarkMode
                      ? "bg-amber-800 text-light-text"
                      : "bg-amber-900 text-white"
                  }`}
                >
                  Orders
                </th>
                <th
                  className={`px-6 py-3 font-bold text-center text-md uppercase tracking-wider ${
                    isDarkMode
                      ? "bg-amber-800 text-light-text"
                      : "bg-amber-900 text-white"
                  }`}
                >
                  Amount Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((customer, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    isDarkMode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-bold flex items-center ${
                      isDarkMode ? "text-light-text" : "text-amber-800"
                    }`}
                  >
                    <img
                      src={customer.imgSrc}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-md leading-5 font-semibold rounded-full ${
                        isDarkMode ? "text-light-text" : "text-dark-text"
                      }`}
                    >
                      {customer.emailSubscription}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-md ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {customer.orders}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-md ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {customer.amountSpent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredCustomers.length > 0 && (
        <div className="pagination mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? isDarkMode
                    ? "bg-amber-600 text-white"
                    : "bg-amber-800 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
