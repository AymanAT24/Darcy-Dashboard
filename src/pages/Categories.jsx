import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Toast container

const Categories = ({ isDarkMode }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [deletingId, setDeletingId] = useState(null); // Track the ID of the category being deleted

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("api/cats/getCats", {
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

  const handleEdit = (categoryId) => {
    navigate(`/editcategory/${categoryId}`);
  };

  const handleDelete = (categoryId) => {
    if (deletingId === categoryId) {
      // Proceed with deletion if ID matches
      deleteCategory(categoryId);
    } else {
      // Set the ID for confirmation
      setDeletingId(categoryId);
      toast.info("Click Confirm to delete or Cancel to abort.", {
        autoClose: false,
        onClose: () => setDeletingId(null), // Reset ID when toast closes
        action: (
          <>
            <button
              onClick={() => deleteCategory(categoryId)}
              className="text-blue-500 px-2 py-1"
            >
              Confirm
            </button>
            <button
              onClick={() => setDeletingId(null)}
              className="text-red-500 px-2 py-1"
            >
              Cancel
            </button>
          </>
        ),
      });
    }
  };

  const deleteCategory = async (categoryId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`cats/deleteCategory/${categoryId}`, {
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
    }
    setDeletingId(null); // Reset ID after operation
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
                  handleDelete(category._id);
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
    </div>
  );
};

export default Categories;
