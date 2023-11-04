import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function AccountDropdown({ setToken }) {
  const handleLogout = async () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    if (typeof setToken === "function") {
      setToken(null);
    }
    // Redirect to the login page or any other desired page
    // Here, we assume there is a '/login' route
    window.location.href = "/login";
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