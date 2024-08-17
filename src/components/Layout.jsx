import React, { useState } from "react";
import { Sidebar, Navbar } from "./";
import "../App.css";

const Layout = ({ children, isDarkMode, toggleTheme }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const containerStyles = {
    background: isDarkMode
      ? " linear-gradient(#111827, #4a5568, #2d3748)"
      : "#fff", // Dark or light background
  };
  return (
    <div
      className={`flex relative ${
        isDarkMode ? "dark:bg-main-dark-bg" : "bg-main-bg"
      }`}
    >
      {/* Sidebar */}
      {activeMenu ? (
        <div
          className={`w-72 transition-all duration-300 fixed ${
            isDarkMode ? "sidebar-dark-mode" : "sidebar"
          }`}
        >
          <Sidebar
            isDarkMode={isDarkMode}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
      ) : (
        <div className="w-0 transition-all duration-300 dark:bg-secondary-dark-bg">
          <Sidebar
            isDarkMode={isDarkMode}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
      )}

      <div
        style={containerStyles}
        className={
          activeMenu
            ? "transition-all overflow-hidden duration-300 min-h-screen md:ml-72 w-full"
            : "transition-all duration-300 w-full min-h-screen flex-2"
        }
      >
        <div className="fixed transition-all duration-300 md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
