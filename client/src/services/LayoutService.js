const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};
const api_layout_url = "http://localhost:8080/api/layout";

export const getLayout = async () => {
  try {
    if (!token) {
      console.error(">> Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_layout_url, {
      headers,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
};


export const postLayout = (layoutname, image, token) => {
  const formData = new FormData();
  formData.append("layoutname", layoutname);
  formData.append("file", image);

  return fetch("http://localhost:8080/api/layout", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((response) => response.text())
    .then((res) => res)
    .catch((error) => {
      console.error(">> Error:", error);
      throw error;
    });
};



export const patchLayout = (layoutname, image, token) => {
  const formData = new FormData();
  formData.append("layoutname", layoutname);
  formData.append("file", image);

  return fetch("http://localhost:8080/api/layout", {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((response) => response.text())
    .then((res) => res)
    .catch((error) => {
      console.error(">> Error:", error);
      throw error;
    });
};

export const deleteLayout = (selectedItems) => {
  if (!token) {
    console.error("Token is missing or invalid. Please log in.");
    return;
  }

  const deletePromises = selectedItems.map((admin) => {
    const requestOptions = {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({
        layoutname: admin.layoutname,
      }),
    };

    return fetch(api_layout_url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.text();
      })
      .then((text) => {
        if (text === "Layout removed") {
          return "Layout removed successfully";
        } else {
          throw new Error("Unexpected response: " + text);
        }
      });
  });

  return Promise.all(deletePromises);
};
