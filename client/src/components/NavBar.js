import React from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.scss";
import logo from "../img/logo.png";
import profileImage from "../img/profile-image.png";
import Menu from './Menu';
export default function NavBar() {
  return (
    <>
    <nav>
        <Link to='/' className='nav-link'><img src={logo} alt="Logo" /></Link>       
        <Menu />
        <img src={profileImage} alt="Profile" className="profile-image" />
    </nav>
        
    </>
  )
}
