import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

// Set up the app element for react-modal
Modal.setAppElement("#root");

const Categories = ({ isDarkMode }) => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("cats/getCats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categoriesproducts/${categoryId}`);
  };

  const handleAddProduct = (categoryId) => {
    navigate(`/addnewproduct/${categoryId}`);
  };

  const handleEdit = (categoryId) => {
    navigate(`/editcategory/${categoryId}`);
  };

  const openDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCategoryId(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedCategoryId) {
      try {
        await axios.delete(`cats/deleteCategory/${selectedCategoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // After deleting, fetch the updated list
        const response = await axios.get("cats/getCats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setCategories(response.data.data);
        }
        toast.success("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      } finally {
        closeDeleteModal();
      }
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "300px",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div
      className={`mt-4 mr-10 ml-12 ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1
          className={`font-bold mb-6 mt-6 text-3xl ${
            isDarkMode ? "text-amber-500" : "text-amber-800"
          }`}
        >
          Categories
        </h1>
        <Link to="/addnewcategory">
          <button
            className={`px-4 py-2 rounded-md hover:bg-opacity-80 ${
              isDarkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
            }`}
          >
            + Add New Category
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-8 flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer ${
              isDarkMode ? "bg-dark-card shadow-md" : "bg-white shadow-md"
            }`}
            style={{ width: "150px", height: "150px" }}
            onClick={() => handleCategoryClick(category._id)}
          >
            <img
              src={`${import.meta.env.VITE_MAIN_URL}${category.image}`}
              alt={category.title}
              className="w-full h-full object-contain"
            />
            <div
              className={`mt-2 font-medium ${
                isDarkMode ? "text-light-text" : "text-dark-text"
              }`}
            >
              {category.title}
            </div>

            {/* Edit and Delete Buttons */}
            <div
              className={`absolute inset-0 flex items-center justify-center space-x-2 opacity-0 hover:opacity-100 transition-all duration-300 ${
                isDarkMode
                  ? "bg-dark-card-text text-light-text"
                  : "bg-white text-dark-text"
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(category._id);
                }}
                className={`px-2 py-1 rounded-md hover:bg-opacity-80 ${
                  isDarkMode
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(category._id);
                }}
                className={`px-2 py-1 rounded-md hover:bg-opacity-80 ${
                  isDarkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
        style={customStyles}
      >
        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
        <p>Are you sure you want to delete this category?</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
