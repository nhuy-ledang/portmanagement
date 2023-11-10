import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function AccountDropdown({ setToken }) {
  const handleLogout = async () => {
    console.log("Logging out...");
    // localStorage.removeItem("token");
    // if (typeof setToken === "function") {
    //   setToken();
    // }
    // window.location.reload();
    if (localStorage && localStorage.token) {
      delete localStorage.token; // Xóa thuộc tính 'token' trong localStorage
    }
    window.location.reload(); // Tải lại trang
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