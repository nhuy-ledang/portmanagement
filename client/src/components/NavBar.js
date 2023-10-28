import React from "react";
import "./NavBar.scss";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../logo.png";
import profileImage from "../profile-image.png";
import Dropdown from "react-bootstrap/Dropdown";

function NavBar() {
  return (
    <div className="container-navbar">
      <Navbar.Brand href="#">
        <img src={logo} alt="Logo" />
      </Navbar.Brand>
      <div className="nav">
        <Nav.Link className="nav-item" href="#">HOME</Nav.Link>
        <NavDropdown title="USER" id="navbarScrollingDropdown" className="nav-item">
          <NavDropdown.Item href="#action3">User Management</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Right Assignment</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="PORT" id="navbarScrollingDropdown" className="nav-item">
          <NavDropdown.Item href="#action3">Layout Management</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Port Assignment</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Port Scheduler</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="ADMIN" id="navbarScrollingDropdown" className="nav-item">
          <NavDropdown.Item href="#action3">Administrator</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Audit Log</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Report</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Device Detection</NavDropdown.Item>
        </NavDropdown>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic" caret={false}>
          <img src={profileImage} alt="Profile" className="profile-image" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Change Password</Dropdown.Item>
          <Dropdown.Item eventKey="2">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NavBar;