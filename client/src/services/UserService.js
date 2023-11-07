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




// User Right
export const getUserRight = async () => {
  try {
    if (!token) {
      console.error(">> Token is missing or invalid. Please log in.");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const apiUrlWithRightParam = `${api_user_url}?right=true`;

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
  const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
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

export const getOptionsRight = async () => {
  try {
    const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
    if (!token) {
      console.error(">> Token is missing or invalid. Please log in.");
      return []; // Trả về một mảng rỗng trong trường hợp lỗi hoặc không có dữ liệu
    }

    const response = await fetch("https://hpid.homethang.duckdns.org/api/right", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok) {
      console.error("Request failed with status code " + response.status);
      return []; // Trả về một mảng rỗng trong trường hợp lỗi
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
    return []; // Trả về một mảng rỗng trong trường hợp lỗi
  }
};


export const postUserCSV = async () => {
  const api_user_csv_url = "https://hpid.homethang.duckdns.org/api/user";
  // const data = { username, email, group };
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

    const response = await fetch(api_user_csv_url, {
      method: "POST",
      headers,
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