import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.scss";
import logo from "../img/logo.png";

async function loginUser(credentials) {
  console.log(JSON.stringify(credentials))
  return fetch("http://homethang.duckdns.org:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.text());
}

export default function Login({ setToken }) {
  const [adminname, setAdminname] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(adminname, password);
    const token = await loginUser({
      adminname,
      password,
    });
    console.log(token);
    setToken(token);
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
              onChange={(e) => setAdminname(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-login" type="submit">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
