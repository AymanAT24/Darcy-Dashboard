import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import img2 from "../assets/f787e6083e36458bacbe994b735ab919-min.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSection = ({ isDarkMode }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust this to show the number of slides you want to display at once
    slidesToScroll: 3,
    arrows: true,
  };

  return (
    <div className="products w-1/2 mr-4 relative mx-auto">
      <Slider {...settings}>
        {/* Product Card 1 */}
        <div
          className={`card w-44 cursor-pointer hover:drop-shadow-2xl rounded-xl shadow-lg ${
            isDarkMode ? "bg-dark-card" : "bg-white"
          }`}
        >
          <img
            src={img2}
            className="card-img-top w-full h-56 object-cover rounded-t-xl"
            alt="Product"
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
              Brown Shirt
              <div className="flex font-500 items-center ml-2 mb-1">
                <FaStar size={16} color="#fbbf24" />
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-amber-300" : "text-amber-300"
                  } ml-1`}
                >
                  4.5
                </span>
              </div>
            </h5>
            <p
              className={`card-text text-md font-bold ${
                isDarkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              150 L.E
            </p>
          </div>
        </div>

        {/* Repeat similar structure for other Product Cards */}
        <div
          className={`card w-44 cursor-pointer hover:drop-shadow-2xl rounded-xl shadow-lg ${
            isDarkMode ? "bg-dark-card" : "bg-white"
          }`}
        >
          <img
            src={img2}
            className="card-img-top w-full h-56 object-cover rounded-t-xl"
            alt="Product"
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
              Brown Shirt
              <div className="flex font-500 items-center ml-2 mb-1">
                <FaStar size={16} color="#fbbf24" />
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-amber-300" : "text-amber-300"
                  } ml-1`}
                >
                  4.5
                </span>
              </div>
            </h5>
            <p
              className={`card-text text-md font-bold ${
                isDarkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              150 L.E
            </p>
          </div>
        </div>

        {/* Add more product cards as needed, following the same structure */}
      </Slider>
    </div>
  );
};

export default ProductSection;
