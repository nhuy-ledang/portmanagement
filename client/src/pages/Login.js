import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';

async function loginUser(credentials) {
 return fetch('http://localhost:8080/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [administrator, setAdministrator] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
        administrator,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Administrator' onChange={e => setAdministrator(e.target.value)} />
          <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};