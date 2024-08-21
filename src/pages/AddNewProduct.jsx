import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import Modal from "react-modal";

const AddNewProduct = ({ isDarkMode }) => {
  const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [colorHexaCode, setColorHexaCode] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple submissions
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const navigate = useNavigate();

  const availableSizes = ["S", "M", "L", "XL"];

  const handleAddSize = (e) => {
    const size = e.target.value;
    if (size && !sizes.includes(size)) {
      setSizes([...sizes, size]);
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  const handleAddColor = () => {
    if (colorName && colorHexaCode) {
      setColors([...colors, { name: colorName, hexaCode: colorHexaCode }]);
      //   setColorName("");
      //   setColorHexaCode("");
    } else {
      toast.error("Please provide a name and hex code for the color.");
    }
  };

  const handleImagePreview = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (loading) return; // If already loading, prevent additional submissions
    setLoading(true); // Set loading to true to prevent multiple submissions

    const formData = new FormData();

    // Append product details
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", categoryId);
    formData.append("price", price);

    // Append sizes
    sizes.forEach((size, index) => {
      formData.append(`size[${index}]`, size);
    });

    // Append colors
    colors.forEach((color, index) => {
      formData.append(`colors[${index}][name]`, color.name);
      formData.append(`colors[${index}][hexaCode]`, color.hexaCode);
    });

    // Append images
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const token = localStorage.getItem("token");
      await axios.post("products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product created successfully!");
      navigate(`/categoriesproducts/${categoryId}`);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Set loading back to false after submission
    }
  };

  const allFieldsFilled =
    name &&
    description &&
    price &&
    sizes.length > 0 &&
    colors.length > 0 &&
    images.length > 0;

  return (
    <div
      className={`max-w-6xl mx-auto p-6 grid grid-cols-2 gap-6 ${
        isDarkMode ? "bg-dark-bg text-light-text" : "bg-light-bg text-dark-text"
      }`}
    >
      {/* Product Information Section */}
      <div
        className={`border p-4 rounded-md ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {/* Display Colors and Their Images */}
        <label className="block text-amber-600 text-lg font-medium mb-2">
          Product Images:
        </label>
        <div className="mt-4">
          {images.length > 0 ? (
            images.map((file, index) => (
              <div key={index} className="mb-4">
                {colors.length > 0 && (
                  <div className="mb-2">
                    {colors.map((color, colorIndex) => (
                      <span
                        key={colorIndex}
                        className="inline-block bg-gray-300 text-gray-300 px-2 py-1 rounded-md mr-2"
                        style={{ backgroundColor: color.hexaCode }}
                      >
                        {color.name}
                      </span>
                    ))}
                  </div>
                )}
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-20 h-20 rounded-md object-cover"
                />
              </div>
            ))
          ) : (
            <p>No images added</p>
          )}
        </div>
        {/* Product Info */}
        <div className="mt-4">
          <p>
            <strong className="text-amber-600">Name:</strong> {name}
          </p>
          <p>
            <strong className="text-amber-600">Description:</strong>{" "}
            {description}
          </p>
          <p>
            <strong className="text-amber-600">Price:</strong> {price} EGP
          </p>
          <p>
            <strong className="text-amber-600">Sizes:</strong>{" "}
            {sizes.length > 0 ? sizes.join(", ") : "No sizes selected"}
          </p>
        </div>
      </div>

      {/* Product Input Form Section */}
      <form
        onSubmit={handleSubmit}
        className={`border p-4 rounded-md ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <label className="block text-lg font-medium mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`w-full border rounded-md p-2 ${
            isDarkMode
              ? "border-gray-700 bg-dark-input text-amber-500"
              : "border-gray-300 bg-white text-amber-800"
          }`}
        />

        <label className="block text-lg font-medium mt-4 mb-2">
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={`w-full border rounded-md p-2 ${
            isDarkMode
              ? "border-gray-700 bg-dark-input text-amber-500"
              : "border-gray-300 bg-white text-amber-800"
          }`}
        ></textarea>

        <label className="block text-lg font-medium mt-4 mb-2">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className={`w-full border rounded-md p-2 ${
            isDarkMode
              ? "border-gray-700 bg-dark-input text-amber-500"
              : "border-gray-300 bg-white text-amber-800"
          }`}
        />

        <label className="block text-lg font-medium mt-4 mb-2">Sizes:</label>
        <div className="flex items-center">
          <select
            onChange={handleAddSize}
            className={`w-full border rounded-md p-2 ${
              isDarkMode
                ? "border-gray-700 bg-dark-input text-amber-500"
                : "border-gray-300 bg-white text-amber-800"
            }`}
          >
            <option value="" disabled selected>
              Select a size
            </option>
            {availableSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {sizes.length > 0 && (
          <div className="mt-2">
            {sizes.map((size, index) => (
              <span
                key={index}
                className="inline-block bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
              >
                {size}
                <button
                  onClick={() => handleRemoveSize(size)}
                  className="ml-1 text-white hover:text-red-300"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

        <label className="block text-lg font-medium mt-4 mb-2">
          Add Color:
        </label>
        <div>
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="Color name"
            required
            className={`border rounded-md p-2 ${
              isDarkMode
                ? "border-gray-700 bg-dark-input text-amber-500"
                : "border-gray-300 bg-white text-amber-800"
            }`}
          />
          <input
            type="color"
            value={colorHexaCode}
            onChange={(e) => setColorHexaCode(e.target.value)}
            placeholder="Hex code"
            required
            className={`border rounded-md p-2 ${
              isDarkMode
                ? "border-gray-700 bg-dark-input text-amber-500"
                : "border-gray-300 bg-white text-amber-800"
            }`}
          />
          <br />
          <button
            type="button"
            onClick={handleAddColor}
            className="bg-blue-500 text-white px-2 mt-4 py-1 rounded-md"
          >
            Add Color
          </button>
        </div>

        <label className="block text-lg font-medium mt-4 mb-2">
          Upload Images:
        </label>
        <input
          type="file"
          multiple
          onChange={handleImagePreview}
          required
          className="mt-2"
        />

        <button
          type="submit"
          className={`w-full mt-6 py-2 rounded-md ${
            loading || !allFieldsFilled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500"
          } text-white`}
          disabled={loading || !allFieldsFilled}
        >
          {loading ? "Loading..." : "Add Product"}
        </button>
      </form>

      {/* Modal Component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Alert Modal"
        className={`modal ${isDarkMode ? "modal-dark" : "modal-light"}`}
        overlayClassName="overlay"
      >
        <h2>{modalContent}</h2>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default AddNewProduct;
