import React from "react";
import { FaArrowRight } from "react-icons/fa";
import img from "../assets/Daco_4144838.png";
import { Link } from "react-router-dom";

const StateSection = ({ isDarkMode }) => {
  return (
    <div
      className={`main w-full h-full rounded overflow-hidden relative ${
        isDarkMode ? "bg-dark-state-bg" : "bg-light-state-bg"
      }`}
    >
      <img
        src={img}
        alt="Image"
        className={`absolute inset-0 w-full h-full object-cover`}
      />
      <div
        className={`absolute inset-0 flex flex-col justify-center p-6 ${
          isDarkMode ? "text-light-text" : "text-dark-text"
        } ${
          isDarkMode ? "bg-dark-overlay" : "bg-light-overlay"
        } hover:drop-shadow-2xl`}
        style={{ paddingTop: "40px" }} // Add top padding to create space
      >
        <h1
          className={`text-xl font-bold ${
            isDarkMode ? "text-amber-500" : "text-amber-800"
          }`}
        >
          Orders State
        </h1>
        <div
          className={`flex flex-col mt-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <span className="mb-2">
            Today{" "}
            <span
              className={`font-bold ${
                isDarkMode ? "text-amber-500" : "text-amber-800"
              }`}
            >
              4
            </span>{" "}
            Orders
          </span>
          <span>
            This Month{" "}
            <span
              className={`font-bold ${
                isDarkMode ? "text-amber-500" : "text-amber-800"
              }`}
            >
              175
            </span>{" "}
            Orders
          </span>
        </div>
        <span
          className={`mt-4 font-bold flex items-center ${
            isDarkMode ? "text-amber-500" : "text-amber-800"
          }`}
        >
          <Link to="/orders" className="inline-flex items-center space-x-2">
            <span>Go to Orders</span>
            <FaArrowRight />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default StateSection;
