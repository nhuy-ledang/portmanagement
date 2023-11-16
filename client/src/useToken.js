import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    // console.log(">> Check tokenString: ", tokenString);
    if (tokenString) {
      try {
        const userToken = JSON.parse(tokenString);
        return userToken.token;
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    return null; 
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    const tokenString = JSON.stringify(userToken);
    localStorage.setItem('token', tokenString);
    setToken(userToken?.token);
  };

  return {
    setToken: saveToken,
    token
  };
}