import { useState } from "react";
import { Link } from 'react-router-dom'
import UserDropdown from "./UserDropdown";
import PortDropdown from "./PortDropdown";
import AdminDropdown from "./AdminDropdown";
import "./Menu.scss";

export default function Menu() {
  const [isUserDropdownVisible, setUserDropdownVisible] = useState(false);
  const [isPortDropdownVisible, setPortDropdownVisible] = useState(false);
  const [isAdminDropdownVisible, setAdminDropdownVisible] = useState(false);

  const handleUserMouseEnter = () => {
    setUserDropdownVisible(true);
  };
  const handlePortMouseEnter = () => {
    setPortDropdownVisible(true);
  };
  const handleAdminMouseEnter = () => {
    setAdminDropdownVisible(true);
  };

  const handleUserMouseLeave = () => {
    setUserDropdownVisible(false);
  };
  const handlePortMouseLeave = () => {
    setPortDropdownVisible(false);
  };
  const handleAdminMouseLeave = () => {
    setAdminDropdownVisible(false);
  };

  return (
    <>
      <div className="App-header">
        <Link to='/' className="menu nav-link">
          <span>HOME</span>
        </Link>
        <div
          className="menu"
          onMouseEnter={handleUserMouseEnter}
          onMouseLeave={handleUserMouseLeave}
        >
          <span>USER</span>
          {isUserDropdownVisible && <UserDropdown />}
        </div>
        <div
          className="menu"
          onMouseEnter={handlePortMouseEnter}
          onMouseLeave={handlePortMouseLeave}
        >
          <span>PORT</span>
          {isPortDropdownVisible && <PortDropdown />}
        </div>
        <div
          className="menu"
          onMouseEnter={handleAdminMouseEnter}
          onMouseLeave={handleAdminMouseLeave}
        >
          <span>ADMIN</span>
          {isAdminDropdownVisible && <AdminDropdown />}
        </div>
      </div>
    </>
  );
}
