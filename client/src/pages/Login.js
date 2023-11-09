import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Login.scss";
import logo from "../img/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function loginUser(credentials) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default function Login({ setToken }) {
  const [adminname, setAdminname] = useState("");
  const [password, setPassword] = useState("");
  const setTokenRef = useRef(setToken);

  useEffect(() => {
    function logout() {
      localStorage.removeItem("token");
      setTokenRef.current("");
    }

    // Đăng ký sự kiện trước khi đóng trình duyệt
    window.addEventListener("beforeunload", logout);

    return () => {
      window.removeEventListener("beforeunload", logout);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminname || !password) {
      toast.error("Please fill in both Administrator and Password fields.");
      return;
    }

    try {
      const token = await loginUser({
        adminname,
        password,
      });

      if (token === null || token === undefined) {
        toast.error("Invalid response from the server.");
      } else if (token === "Wrong adminname or password") {
        toast.error("Incorrect Administrator or Password.");
      } else {
        localStorage.setItem("token", token);
        setToken(token);
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <>
      <div className="nav-login">
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-wrapper">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Administrator"
              value={adminname}
              onChange={(e) => setAdminname(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-login" type="submit">
              LOGIN
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
