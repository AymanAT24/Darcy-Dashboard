import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import {
  Home,
  Categories,
  Customers,
  Login,
  Orders,
  CategoriesProducts,
  ProductDetails,
} from "./pages";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Set class on the document element based on dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Routes that use Layout */}
        <Route
          path="/*"
          element={
            <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
              <Routes>
                <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
                <Route
                  path="/categories"
                  element={<Categories isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/customers"
                  element={<Customers isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/orders"
                  element={<Orders isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/productdetails"
                  element={<ProductDetails isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/categoriesproducts"
                  element={<CategoriesProducts isDarkMode={isDarkMode} />}
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
