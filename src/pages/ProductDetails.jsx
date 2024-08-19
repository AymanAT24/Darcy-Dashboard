import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = ({ isDarkMode }) => {
  const { productId } = useParams(); // Get the productId from the route params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.50:3000/api/products/getOne/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token]);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div
      className={`p-6 font-sans flex ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      {/* Left Side: Images */}
      <div className="w-1/3 flex flex-col items-center mr-8">
        <Slider {...settings} className="w-full mb-4">
          {product.colors.map((color) => (
            <div key={color._id}>
              <img
                src={`http://192.168.0.50:3000/api/${color.image}`}
                alt={color.name}
                className="w-full"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-2/3">
        <div
          className={`text-sm mb-2 ${
            isDarkMode ? "text-light-text" : "text-amber-800"
          }`}
        >
          {product.category.title}
        </div>
        <h1
          className={`text-2xl font-semibold mb-2 ${
            isDarkMode ? "text-amber-500" : "text-amber-900"
          }`}
        >
          {product.name}
        </h1>
        <div
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-light-text" : "text-gray-900"
          }`}
        >
          {product.price} EGP
        </div>

        <div className="mt-6">
          <h2
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-amber-500" : "text-dark-text"
            }`}
          >
            Product Details
          </h2>
          <p
            className={`text-base ${
              isDarkMode ? "text-light-text" : "text-dark-text"
            }`}
          >
            {product.description}
          </p>
        </div>

        <div className="mt-4">
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-amber-500" : "text-dark-text"
            }`}
          >
            Available Sizes
          </h3>
          <p>{product.size.join(", ")}</p>
        </div>

        <div className="mt-4">
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-amber-500" : "text-dark-text"
            }`}
          >
            Average Rating
          </h3>
          <p>
            {product.ratingsAverage} / 5 ({product.ratingsQuantity} reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
