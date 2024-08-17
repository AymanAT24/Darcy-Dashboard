import React, { useState, useEffect } from "react";
import "./Login.scss";
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import logo from "../assets/logo_white.png";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="login">
        <div className="card">
          <div className="left">
            <img src={logo} alt="" />
          </div>
          <div className="right">
            <h1>Login</h1>
            <form>
              <input
                type="text"
                className="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="password-input">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
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
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
