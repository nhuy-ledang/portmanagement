import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import useToken from '../useToken';
import { Link } from 'react-router-dom';
export default function AccountDropdown() {
  const { setToken } = useToken();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    setToken("");
    localStorage.clear();
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="account-dropdown">
      <ul>
        <li><Link to='/change-password' className='nav-link'>Change Password</Link></li>
        <li className='nav-link' onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
}