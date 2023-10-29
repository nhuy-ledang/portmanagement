import React from "react";
import { Link } from 'react-router-dom';
export default function AccountDropdown() {
  return (
    <div className="dropdown-menu">
      <ul>
        <li><Link to='/change-password' className='nav-link'>Change Password</Link></li>
        <li>Logout</li>
      </ul>
    </div>
  );
}
