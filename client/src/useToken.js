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

// import { useState, useEffect } from 'react';

// export default function useToken() {
//   const getToken = () => {
//     const tokenString = localStorage.getItem('token');
//     if (tokenString) {
//       try {
//         const userToken = JSON.parse(tokenString);
//         // Check if the token has expired or is invalid
//         const currentTime = Date.now();
//         if (userToken.expiresAt && currentTime > userToken.expiresAt) {
//           // Token has expired, clear it from local storage
//           localStorage.removeItem('token');
//           return null;
//         }
//         return userToken.token;
//       } catch (error) {
//         console.error('Error parsing token:', error);
//       }
//     }
//     return null;
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = userToken => {
//     if (userToken) {
//       const tokenString = JSON.stringify(userToken);
//       localStorage.setItem('token', tokenString);
//       setToken(userToken.token);
//     } else {
//       // Clear token from Local Storage and reset the state
//       localStorage.removeItem('token');
//       setToken(null);
//     }
//   };

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       // Call logout function when browser is closed
//       saveToken(null);
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   return {
//     setToken: saveToken,
//     token
//   };
// }