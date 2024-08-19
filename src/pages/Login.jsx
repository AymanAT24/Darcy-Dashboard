import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.scss";
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import logo from "../assets/logo_white.png";

const Login = ({ isDarkMode, toggleTheme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = "http://192.168.0.50:3000";
    try {
      const response = await axios.post(`${url}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        // Redirect to the home page or other protected route
        window.location.href = "/";
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Show error message from the response
        toast.error(error.response.data.message);
      } else {
        // Show a generic error message if no specific message is available
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <img src={logo} alt="" />
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <div className="icon">
                    <IoIosEyeOff />
                  </div>
                ) : (
                  <div className="icon">
                    <FaEye />
                  </div>
                )}
              </span>
            </div>
            <label className="checkbox" htmlFor="rememberMe">
              <input type="checkbox" id="rememberMe" />{" "}
              <span className="rem">Remember Me</span>
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
