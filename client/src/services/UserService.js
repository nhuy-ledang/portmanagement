const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};
const api_user_url = "https://hpid.homethang.duckdns.org/api/user";

export const getUser = async () => {
  try {
    const token = localStorage.token
      ? JSON.parse(localStorage.token)?.token
      : null;
    if (!token) {
      console.error(">> Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_user_url, {
      headers,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postUser = async (username, email, group) => {
  const data = { username, email, group };
  try {
    const token = localStorage.token
      ? JSON.parse(localStorage.token)?.token
      : null;

    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

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
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.token).token,
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

export const deleteUser = (selectedItems) => {
  if (!token) {
    console.error("Token is missing or invalid. Please log in.");
    return;
  }

  const deletePromises = selectedItems.map((user) => {
    const requestOptions = {
      method: "DELETE",
      headers: headers,
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
};
