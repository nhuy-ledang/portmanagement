import React from "react";
import { Link } from 'react-router-dom';
export default function AccountDropdown() {
  return (
    <div className="account-dropdown">
      <ul>
        <li><Link to='/change-password' className='nav-link'>Change Password</Link></li>
        <li className='nav-link'>Logout</li>
      </ul>
    </div>
  );
}