import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// async function loginUser(credentials) {
//   return fetch("https://reqres.in/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

export default function AccountDropdown({ setToken }) {
  const handleLogout = async () => {
    console.log("aaaaa");
    localStorage.removeItem("token");
    if (typeof setToken === "function") {
      setToken(null);
    }
    window.location.reload();
  };

  return (
    <div className="account-dropdown">
      <ul>
        <li>
          <Link to="/change-password" className="nav-link">
            Change Password
          </Link>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

AccountDropdown.propTypes = {
  setToken: PropTypes.func.isRequired,
};