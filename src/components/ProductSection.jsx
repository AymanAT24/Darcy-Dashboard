import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import axios from "../api/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSection = ({ isDarkMode }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get("products/aliasTopProducts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
  };

  return (
    <div className="products w-1/2 mr-4 relative mx-auto">
      {products.length > 0 ? (
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product._id}
              className={`card w-44 cursor-pointer hover:drop-shadow-2xl rounded-xl shadow-lg ${
                isDarkMode ? "bg-dark-card" : "bg-white"
              }`}
            >
              {/* {console.log(products)} */}
              <img
                src={`${import.meta.env.VITE_MAIN_URL}${
                  product.colors[0].image
                }`}
                className="card-img-top w-full h-56 object-cover rounded-t-xl"
                alt={product.name}
              />
              <div
                className={`card-body p-4 flex flex-col h-full ${
                  isDarkMode
                    ? "bg-dark-card-text text-light-text"
                    : "bg-white text-gray-900"
                }`}
              >
                <h5
                  className={`card-title flex justify-between text-amber-800 text-md font-bold mb-2 ${
                    isDarkMode ? "text-amber-400" : "text-amber-800"
                  }`}
                >
                  {product.name}
                  <div className="flex font-500 items-center ml-2 mb-1">
                    <FaStar size={16} color="#fbbf24" />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-amber-300" : "text-amber-300"
                      } ml-1`}
                    >
                      {product.ratingsAverage}
                    </span>
                  </div>
                </h5>
                <p
                  className={`card-text text-md font-bold ${
                    isDarkMode ? "text-gray-300" : "text-gray-900"
                  }`}
                >
                  {product.price} L.E
                </p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-lg">
          No products available at the moment.
        </p>
      )}
    </div>
  );
};

export default ProductSection;
