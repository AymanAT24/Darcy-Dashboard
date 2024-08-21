import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Slider from "react-slick";
import { useParams, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import { toast } from "react-toastify";

const ProductDetails = ({ isDarkMode }) => {
  const { productId, categoryId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`products/getOne/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted successfully!");
      navigate(`/categories`);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div
      className={`p-6 font-sans flex ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      {/* Left Side: Images */}
      <div className="w-1/3 flex flex-col items-center mr-8">
        <Slider className="w-full mb-4">
          {product.colors.map((color) => (
            <div key={color._id}>
              <img
                src={`${import.meta.env.VITE_MAIN_URL}${color.image}`}
                alt={color.name}
                className="w-full"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-2/3">
        <div
          className={`text-sm mb-2 ${
            isDarkMode ? "text-light-text" : "text-amber-800"
          }`}
        >
          {product.category.title}
        </div>
        <h1
          className={`text-2xl font-semibold mb-2 ${
            isDarkMode ? "text-amber-500" : "text-amber-900"
          }`}
        >
          {product.name}
        </h1>
        <div
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-light-text" : "text-gray-900"
          }`}
        >
          {product.price} EGP
        </div>

        <div className="mt-6">
          <h2
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-amber-500" : "text-amber-800"
            }`}
          >
            Product Details
          </h2>
          <p
            className={`text-base ${
              isDarkMode ? "text-light-text" : "text-dark-text"
            }`}
          >
            {product.description}
          </p>
        </div>

        <div className="mt-4">
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-amber-500" : "text-amber-800"
            }`}
          >
            Available Sizes
          </h3>
          <p>{product.size.join(", ")}</p>
        </div>

        <div className="mt-4">
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-amber-500" : "text-amber-800"
            }`}
          >
            Average Rating
          </h3>
          <p>
            {product.ratingsAverage} / 5 ({product.ratingsQuantity} reviews)
          </p>
        </div>

        <button
          onClick={openModal}
          className={`mt-4 px-4 py-2 rounded-md ${
            isDarkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
          }`}
        >
          Delete Product
        </button>

        {/* Confirmation Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Confirm Delete"
          style={customStyles}
        >
          <h2 className="text-lg font-semibold">Confirm Deletion</h2>
          <p>Are you sure you want to delete this product?</p>
          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductDetails;
