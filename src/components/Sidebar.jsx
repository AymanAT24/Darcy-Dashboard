import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineHome, MdOutlineLocalShipping } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import logo from "../assets/logo_white.png";

const Sidebar = ({ activeMenu, isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeLink = `flex items-center transition-all gap-5 pl-4 pt-3 pb-2.5 rounded-lg ${
    isDarkMode ? "text-gray-300 bg-zinc-600" : "text-black bg-gray-200"
  } text-md m-2`;

  const normalLink = `flex items-center transition-all gap-5 pl-4 pt-3 pb-2.5 rounded-lg ${
    isDarkMode
      ? "text-gray-200 hover:text-gray-100 hover:bg-dark-hover"
      : "text-white hover:bg-light-gray"
  } m-2`;

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div
      className={`ml-3 h-screen relative transition-all duration-500 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ${
        isDarkMode ? "bg-dark-sidebar shadow-lg" : "bg-light-sidebar shadow-md"
      }`}
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight"
            >
              <img src={logo} className="w-40 h-14" alt="Logo" />
            </Link>
          </div>
          <div className="mt-10">
            <p
              className={`text-gray-300 m-3 mt-4 uppercase ${
                isDarkMode ? "text-gray-300" : "text-gray-300"
              }`}
            >
              Pages
            </p>
          </div>
          <Link to="/" className={isActive("/") ? activeLink : normalLink}>
            <MdOutlineHome />
            <span className="capitalize">Home</span>
          </Link>
          <Link
            to="/orders"
            className={isActive("/orders") ? activeLink : normalLink}
          >
            <MdOutlineLocalShipping />
            <span className="capitalize">Orders</span>
          </Link>
          <Link
            to="/customers"
            className={isActive("/customers") ? activeLink : normalLink}
          >
            <IoPeopleOutline />
            <span className="capitalize">Customers</span>
          </Link>
          <Link
            to="/categories"
            className={isActive("/categories") ? activeLink : normalLink}
          >
            <BiCategory />
            <span className="capitalize">Categories</span>
          </Link>

          <div className="transition-all fixed bottom-4">
            <button
              onClick={handleSignOut}
              className={`flex items-center font-extrabold justify-between ${
                isDarkMode ? "text-red-500" : "text-red-600"
              } m-3 uppercase`}
            >
              <span>Sign Out</span>
              <FaSignOutAlt className="ml-40" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
