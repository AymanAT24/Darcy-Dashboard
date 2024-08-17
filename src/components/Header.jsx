import React from "react";

const Header = ({ isDarkMode }) => {
  return (
    <div className={`heading ${isDarkMode ? "" : "bg-light-header"} p-4`}>
      <h1
        className={`font-bold text-3xl ${
          isDarkMode ? "text-amber-500" : "text-amber-800"
        }`}
      >
        Welcome To <span className="uppercase">Darcy</span>.
      </h1>
      <p
        className={`font-medium text-1xl ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Hello Admin, Welcome back!
      </p>
    </div>
  );
};

export default Header;
