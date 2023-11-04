import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Login.scss";
import logo from "../img/logo.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function loginUser(credentials) {
  try {
    const response = await axios.post(
      "https://hpid.homethang.duckdns.org/api/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default function Login({ setToken }) {
  const [adminname, setAdminname] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    function logout() {
      localStorage.removeItem("token");
      setToken(null);
    }
    
    // Kiểm tra tính hợp lệ của token mỗi khi trang được tải
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/verifyToken`, { token })
        .then((response) => {
          // Token hợp lệ
        })
        .catch((error) => {
          // Token không hợp lệ, đăng xuất người dùng và xóa token từ localStorage
          logout();
        });
    }
    
    // Đăng ký sự kiện trước khi đóng trình duyệt
    window.addEventListener("beforeunload", logout);

    return () => {
      window.removeEventListener("beforeunload", logout);
    };
  }, [setToken]);

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
