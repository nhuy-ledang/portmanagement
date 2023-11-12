const token = localStorage.token ? JSON.parse(localStorage.token).token : null;

const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};
const api_user_url = `${process.env.REACT_APP_API_URL}/user`;
const api_user_right_url = `${process.env.REACT_APP_API_URL}/right`;
const api_import_user_url = `${process.env.REACT_APP_API_URL}/user?csv=true`;

export const getUser = async () => {
  try {
    const token = localStorage.token ? JSON.parse(localStorage.token).token : null;
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_user_url, {
      headers,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const postUser = async (username, email, group) => {
  const data = { username, email, group };
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_user_url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request failed with status code " + response.status);
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const patchUser = async (username, email, group) => {
  const data = { username, email, group };
  try {
    const response = await fetch(api_user_url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request failed with status code " + response.status);
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteUser = async (selectedItems) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const deletePromises = selectedItems.map((user) => {
      const requestOptions = {
        method: "DELETE",
        headers,
        body: JSON.stringify({
          username: user.username,
        }),
      };

      return fetch(api_user_url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((text) => {
          if (text === "User removed") {
            return "User removed successfully";
          } else {
            throw new Error("Unexpected response: " + text);
          }
        });
    });

    return Promise.all(deletePromises);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getUserRight = async () => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }
    const apiUrlWithRightParam = `${api_user_url}?right=true`;

    const response = await fetch(apiUrlWithRightParam, {
      headers,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const patchUserRight = async (username, email, group, right) => {
  const data = { username, email, group, right };
  const apiUrlWithRightParam = `${api_user_url}?right=true`;
  try {
    const response = await fetch(apiUrlWithRightParam, {
      method: "PATCH",
      headers, // Điều này sẽ truyền headers trực tiếp, không cần phải wrap lại trong một đối tượng headers
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request failed with status code " + response.status);
    }

    const responseData = await response.text();

    if (responseData === "Edit right done") {
      return "Edit successfully"; // Hoặc trả về bất kỳ thông điệp thành công nào bạn muốn.
    } else {
      throw new Error("Edit failed: " + responseData);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const getRightsFromAPI = async () => {
  try {
    const response = await fetch(api_user_right_url); 
    if (!response.ok) {
      throw new Error("Failed to fetch rights");
    }

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error("Error fetching rights:", error);
    throw error;
  }
};


export const postUserCSV = async (userData) => {
  try {
    const response = await fetch(api_import_user_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', Authorization: token,
      },
      body: JSON.stringify({ data: userData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let responseData;

    // Check if the response is JSON
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      responseData = await response.json();
    } else {
      // If not JSON, treat it as plain text
      responseData = await response.text();
    }

    console.log('API response:', responseData);

    return responseData;
  } catch (error) {
    console.error('Error in postUserCSV:', error.message);
    throw new Error('Error in postUserCSV');
  }
};

