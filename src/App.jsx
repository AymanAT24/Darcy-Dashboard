import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import {
  Home,
  Categories,
  Customers,
  Login,
  Orders,
  CategoriesProducts,
  ProductDetails,
  AddNewCategory,
  EditCategory,
} from "./pages";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

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
        <Route
          path="/login"
          element={<Login isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
                <Routes>
                  <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
                  <Route
                    path="/categories"
                    element={<Categories isDarkMode={isDarkMode} />}
                  />
                  <Route
                    path="/addnewcategory"
                    element={<AddNewCategory isDarkMode={isDarkMode} />}
                  />
                  <Route
                    path="/editcategory/:categoryId"
                    element={<EditCategory isDarkMode={isDarkMode} />}
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
                    path="/productdetails/:productId"
                    element={<ProductDetails isDarkMode={isDarkMode} />}
                  />

                  <Route
                    path="/categoriesproducts/:categoryId"
                    element={<CategoriesProducts isDarkMode={isDarkMode} />}
                  />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
