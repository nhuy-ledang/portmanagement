const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};
const api_admin_url = "https://hpid.homethang.duckdns.org/api/admin";

export const getAdmin = async () => {
  try {
    const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;

    if (!token) {
      console.error(">> Token is missing or invalid. Please log in.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const response = await fetch(api_admin_url, {
      headers,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postAdmin = async (
  adminname,
  email,
  password,
  confirmpassword,
  fullname
) => {
  const data = { adminname, email, password, confirmpassword, fullname };
  try {
    const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;

    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const response = await fetch(api_admin_url, {
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

export const patchAdmin = async (adminname, email, fullname) => {
  const data = { adminname, email, fullname };
  try {
    const response = await fetch(api_admin_url, {
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

export const deleteAdmin = (selectedItems) => {
  if (!token) {
    console.error("Token is missing or invalid. Please log in.");
    return;
  }

  const deletePromises = selectedItems.map((admin) => {
    const requestOptions = {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({
        adminname: admin.adminname,
      }),
    };

    return fetch(api_admin_url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.text();
      })
      .then((text) => {
        if (text === "Admin removed") {
          return "Admin removed successfully";
        } else {
          throw new Error("Unexpected response: " + text);
        }
      });
  });

  return Promise.all(deletePromises);
};
