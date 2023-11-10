const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};
const api_port_url = `${process.env.REACT_APP_API_URL}/port`;


export const getPort = async () => {
  try {
    const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;

    if (!token) {
      console.error(">> Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_port_url, {
      headers,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
};
