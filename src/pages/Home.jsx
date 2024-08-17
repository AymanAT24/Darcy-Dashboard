import React from "react";
import { Header } from "../components";
import StateSection from "../components/StateSection";
import VideoSection from "../components/VideoSection";
import ProductSection from "../components/ProductSection";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import CustomersSection from "../components/CustomersSection";

const Home = ({ isDarkMode }) => {
  return (
    <div
      className={`home-container mt-2 ml-10 ${
        isDarkMode ? "bg-dark-bg" : "bg-light-bg"
      }`}
    >
      <Header isDarkMode={isDarkMode} />

      <div className="flex mt-6 w-11/12">
        <VideoSection />
        <div
          className={`state w-1/2 hover:drop-shadow-2xl relative ml-4 flex items-center ${
            isDarkMode ? "bg-dark-state-bg" : "bg-light-state-bg"
          }`}
        >
          <StateSection isDarkMode={isDarkMode} />
        </div>
      </div>

      <div
        className={`mt-8 w-full ${
          isDarkMode ? "text-light-text" : "text-dark-text"
        }`}
      >
        {/* Heading section */}
        <div
          className={`heading transition-all justify-between flex mb-10 w-1/2 ${
            isDarkMode ? "bg-dark-heading-bg" : "bg-light-heading-bg"
          }`}
        >
          <h1
            className={`font-bold text-3xl ${
              isDarkMode ? "text-amber-500" : "text-amber-800"
            }`}
          >
            Products
          </h1>
          <button
            className={`border border-transparent hover:bg-amber-800 hover:text-white text-sm rounded p-2 ${
              isDarkMode
                ? "text-gray-400 hover:bg-amber-700"
                : "text-gray-600  "
            }`}
          >
            <Link to="products" className="flex items-center">
              See All <BsArrowRightShort />
            </Link>
          </button>
        </div>

        <div className="flex w-full">
          <ProductSection isDarkMode={isDarkMode} />
          <CustomersSection isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default Home;
