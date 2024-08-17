import React from "react";
import { CategoryProductsButtons } from "../components";

const CategoriesProducts = ({ isDarkMode }) => {
  const products = [
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+1", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+2", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+3", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+4", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+5", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+6", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+7", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+8", // Placeholder image
    },
    {
      name: "Black Shirt",
      price: "450EGP",
      rating: 4.5,
      image: "https://via.placeholder.com/300?text=Black+Shirt+9", // Placeholder image
    },
  ];

  return (
    <div
      className={`mt-4 ml-10 mr-10 ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1
          className={`font-bold text-3xl ${
            isDarkMode ? "text-amber-500" : "text-amber-800"
          }`}
        >
          T - Shirts
        </h1>
        <button
          className={`px-4 py-2 rounded-md hover:bg-opacity-80 ${
            isDarkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
          }`}
        >
          + Add New Product
        </button>
      </div>
      <div className="grid cursor-pointer grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group ${
              isDarkMode
                ? "bg-dark-card text-amber-text"
                : "bg-white text-dark-text"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-48 object-cover rounded-md ${
                isDarkMode ? "bg-dark-card" : "bg-white"
              }`}
            />
            <div className="mt-2">
              <h2
                className={`font-bold text-lg ${
                  isDarkMode ? "text-amber-500" : "text-amber-900"
                }`}
              >
                {product.name}
              </h2>
              <p
                className={`text-gray-600 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {product.price}
              </p>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span
                  className={`ml-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {product.rating}
                </span>
              </div>
            </div>
            <CategoryProductsButtons isDarkMode={isDarkMode} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesProducts;
