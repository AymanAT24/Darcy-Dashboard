import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = ({ isDarkMode }) => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      className={`p-6 font-sans flex ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      {/* Left Side: Images */}
      <div className="w-1/3 flex flex-col items-center mr-8">
        <Slider {...settings} className="w-full mb-4">
          <div>
            <img
              src="https://via.placeholder.com/200?text=Image+1"
              alt="Product Image 1"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/200?text=Image+2"
              alt="Product Image 2"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/200?text=Image+3"
              alt="Product Image 3"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/200?text=Image+4"
              alt="Product Image 4"
              className="w-full"
            />
          </div>
        </Slider>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-2/3">
        <div
          className={`text-sm mb-2 ${
            isDarkMode ? "text-light-text" : "text-amber-800"
          }`}
        >
          T-Shirt
        </div>
        <h1
          className={`text-2xl font-semibold mb-2 ${
            isDarkMode ? "text-amber-500" : "text-amber-900"
          }`}
        >
          Men's Fashion T Shirt
        </h1>
        <div
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-light-text" : "text-gray-900"
          }`}
        >
          $139.00
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
            The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz.
            per sq. yd. fabric constructed from 100% cotton, this classic fit
            preshrunk jersey knit provides unmatched comfort with each wear.
            Featuring a taped neck and shoulder, and a seamless double-needle
            collar, and available in a range of colors, it offers it all in the
            ultimate head-turning package.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
