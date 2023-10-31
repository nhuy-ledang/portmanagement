import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.scss";
import logo from "../img/logo.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function loginUser(credentials) {
  try {
    const response = await axios.post(
      "http://homethang.duckdns.org:3000/api/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function Login({ setToken }) {
  const [adminname, setAdminname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({
        adminname,
        password,
      });
      console.log(token);
      if (token === "Invailid adminname or password" || token === "Wrong adminname or password") {
        console.log("adminname:", adminname, "password:", password);
        toast.error("Đăng nhập không thành công");
      } else {
        localStorage.setItem("token", token);
        setToken(token);
        console.log("adminname:", adminname, "password:", password);
        toast.success("Đăng nhập thành công");
      }
    } catch (error) {
      console.error(error);
      console.log("adminname:", adminname, "password:", password);
      toast.error("Đăng nhập thất bại");
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