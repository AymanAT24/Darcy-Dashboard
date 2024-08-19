import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = ({ isDarkMode }) => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.50:3000/api/cats/getOneCat/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.status) {
          setCategoryName(response.data.data.title);
          // Set categoryImage URL or handle it according to your needs
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!categoryName) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", categoryName);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    try {
      const response = await axios.patch(
        `http://192.168.0.50:3000/api/cats/updateCategory/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        toast.success("Category Updated Successfully!");
        navigate("/categories");
      } else {
        toast.error(response.data.message || "Failed to update category.");
      }
    } catch (error) {
      toast.error("Error updating category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div
      className={`p-6 rounded-lg flex font-bold justify-center flex-col mx-auto ${
        isDarkMode ? "bg-gray-800 text-amber-500" : "bg-gray-100 text-amber-800"
      }`}
      style={{ width: "600px", height: "500px" }}
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Edit Category</h2>
      <div className="mb-4">
        <label className="block mb-2">Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={handleNameChange}
          className={`w-full p-3 rounded ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Category Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className={`w-full p-3 rounded ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`px-6 py-2 rounded ${
            isDarkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
          } hover:bg-opacity-80`}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <button
          onClick={handleCancel}
          className={`px-6 py-2 rounded ${
            isDarkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
          } hover:bg-opacity-80`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
