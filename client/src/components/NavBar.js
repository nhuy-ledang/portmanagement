import React from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.scss";
import logo from "../img/logo.png";
import Menu from './Menu';
import AccountMenu from './AccountMenu';
export default function NavBar() {
  return (
    <>
    <nav>
        <Link to='/' className='nav-link'><img src={logo} alt="Logo" /></Link>       
        <Menu />
        <AccountMenu />
    </nav>
        
    </>
  )
}
