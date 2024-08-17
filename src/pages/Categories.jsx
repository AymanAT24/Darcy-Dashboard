import React from "react";

const Categories = ({ isDarkMode }) => {
  const categories = [
    { name: "T-Shirt", icon: "👕" },
    { name: "Pants", icon: "👖" },
    { name: "Dress", icon: "👗" },
    { name: "Jacket", icon: "🧥" },
  ];

  return (
    <div
      className={`mt-4 mr-10 ml-10 ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1
          className={`font-bold text-3xl ${
            isDarkMode ? "text-amber-500" : "text-amber-800"
          }`}
        >
          Categories
        </h1>
        <button
          className={`px-4 py-2 rounded-md hover:bg-opacity-80 ${
            isDarkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
          }`}
        >
          + Add New Category
        </button>
      </div>
      <div className="flex space-x-4 mt-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer  hover:bg-opacity-80 transition-all ${
              isDarkMode ? "bg-dark-card shadow-md" : "bg-white shadow-md"
            }`}
            style={{ width: "150px", height: "150px" }}
          >
            <div className="text-5xl">{category.icon}</div>
            <div
              className={`mt-2 font-medium ${
                isDarkMode ? "text-light-text" : "text-dark-text"
              }`}
            >
              {category.name}
            </div>

            {/* Buttons hidden by default */}
            <div
              className={`absolute inset-0 flex items-center justify-center space-x-2 opacity-0 hover:opacity-100 transition-all duration-300 ${
                isDarkMode
                  ? "bg-dark-card-text text-light-text"
                  : "bg-white text-dark-text"
              }`}
            >
              <button
                className={`px-2 py-1 rounded-md hover:bg-opacity-80 ${
                  isDarkMode
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                Edit
              </button>
              <button
                className={`px-2 py-1 rounded-md hover:bg-opacity-80 ${
                  isDarkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
