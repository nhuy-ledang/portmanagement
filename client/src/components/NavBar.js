import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./NavBar.scss";
import { navItems } from "./NavItems";
import Dropdown from "./Dropdown";
import logo from "../logo.png";
import profileImage from "../profile-image.png";

function NavBar() {
    const [dropdown, setDropdown] = useState(false);
  return (
    <BrowserRouter basename="/">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "Services") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdown && <Dropdown />}
                </li>
              );
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </BrowserRouter>
  );
}

export default NavBar;