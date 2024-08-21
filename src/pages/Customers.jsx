import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Customers = ({ isDarkMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const itemsPerPage = 8;
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch customers from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("auth/getUsers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.status) {
          setCustomers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

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

  // Handle clicking the "View Orders" button
  const handleViewOrders = (userId) => {
    navigate(`/userorders/${userId}`); // Navigate to the UserOrders page with userId
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
                  Actions
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
                      src={
                        customer.profileImage
                          ? `${import.meta.env.VITE_MAIN_URL}${
                              customer.profileImage
                            }`
                          : "https://via.placeholder.com/40"
                      }
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
                      {customer.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewOrders(customer._id)}
                      className={`px-4 py-2 rounded ${
                        isDarkMode
                          ? "bg-amber-500 text-white"
                          : "bg-amber-800 text-white"
                      }`}
                    >
                      View Orders
                    </button>
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
