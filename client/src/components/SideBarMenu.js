import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import PortDropdown from "./PortDropdown";
import AdminDropdown from "./AdminDropdown";
import "./SideBarMenu.scss";
import { slide as Menu } from "react-burger-menu";

export default function SideBarMenu() {
  const [isUserDropdownVisible, setUserDropdownVisible] = useState(false);
  const [isPortDropdownVisible, setPortDropdownVisible] = useState(false);
  const [isAdminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 960);

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

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <div className="App-header">
          <Link to="/" className="menu nav-link">
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
      ) : (
        <div className="menu-mobile">
          <Menu>           
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  HOME
                </Link>
              </li>
              <li>
                USER
                <ul>
                  <li>
                    <Link to="/user-management" className="nav-link">
                      User Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/right-assignment" className="nav-link">
                      Right Assignment
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                PORT
                <ul>
                  <li>
                    <Link to="/layout-management" className="nav-link">
                      Layout Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/port-assignment" className="nav-link">
                      Port Assignment
                    </Link>
                  </li>
                  <li>
                    <Link to="/port-scheduler" className="nav-link">
                      Port Scheduler
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                ADMIN
                <ul>
                  <li>
                    <Link to="/administrator" className="nav-link">
                      Administrator
                    </Link>
                  </li>
                  <li>
                    <Link to="/audit-log" className="nav-link">
                      Audit Log
                    </Link>
                  </li>
                  <li>
                    <Link to="/report" className="nav-link">
                      Report
                    </Link>
                  </li>
                  <li>
                    <Link to="/device-detection" className="nav-link">
                      Device Detection
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </Menu>
        </div>
      )}
    </>
  );
}
