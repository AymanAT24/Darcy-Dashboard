import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSunnySharp } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";

const Navbar = ({ activeMenu, setActiveMenu, isDarkMode, toggleTheme }) => {
  return (
    <div
      className={`flex justify-between items-center p-2 md:ml-6 md:mr-6 relative ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      <button
        type="button"
        onClick={() => setActiveMenu(!activeMenu)}
        className={`text-2xl rounded-full p-3 ${
          isDarkMode
            ? "text-amber-500 hover:bg-dark-hover"
            : "text-amber-900 hover:bg-light-gray"
        }`}
      >
        <AiOutlineMenu />
      </button>

      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleTheme}
          className={`text-2xl rounded-full p-3 ml-4 ${
            isDarkMode
              ? "text-amber-500 hover:bg-dark-hover"
              : "text-amber-900 hover:bg-light-gray"
          }`}
        >
          {isDarkMode ? <IoSunnySharp /> : <LuMoon />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
