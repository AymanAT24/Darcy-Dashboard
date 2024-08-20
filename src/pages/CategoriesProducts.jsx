import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryProductsButtons } from "../components";

const CategoriesProducts = ({ isDarkMode }) => {
  const { categoryId } = useParams(); // Get the categoryId from the route params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`products/getAll/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, token]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }

  const handleProductClick = (productId) => {
    // Navigate to the ProductDetails page with the product ID in the URL
    navigate(`/productdetails/${productId}`);
  };

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
          Products
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
        {products.map((product) => {
          console.log(product.colors[0].image); // Log the first image of each product's colors array

          // Handle cases where colors array might be empty
          const productImage =
            product.colors.length > 0
              ? product.colors[0].image
              : "http://via.placeholder.com/300";

          return (
            <div
              key={product._id}
              className={`relative p-4 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group ${
                isDarkMode
                  ? "bg-dark-card text-amber-text"
                  : "bg-white text-dark-text"
              }`}
              onClick={() => handleProductClick(product._id)} // Add click handler
            >
              <img
                src={`http://192.168.0.50:3000/api/${productImage}`}
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
                  {product.price} EGP
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span
                    className={`ml-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
              <CategoryProductsButtons isDarkMode={isDarkMode} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesProducts;
