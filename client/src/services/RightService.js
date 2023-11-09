const api_user_url = "http://localhost:8080/api/user";
const apiUrlWithRightParam = `${api_user_url}?right=true`;
const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};

export const getUserRight = async () => {
  try {
    if (!token) {
      console.error(">> Token is missing or invalid. Please log in.");
      return;
    }
    const response = await fetch(apiUrlWithRightParam, {
      headers,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const patchUserRight = async (username, email, group, right) => {
  const data = { username, email, group, right };
  try {
    const response = await fetch(apiUrlWithRightParam, {
      method: "PATCH",
      headers: {
        headers,
      },
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
