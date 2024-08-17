import React from "react";

const CategoryProductsButtons = () => {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-end transform translate-y-full group-hover:translate-y-0 transition-transform">
        <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
          Edit
        </button>
        <button className="px-3 ml-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
          Delete
        </button>
      </div>
    </>
  );
};

export default CategoryProductsButtons;
