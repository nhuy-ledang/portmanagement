import React, { useEffect, useState } from "react";
import "../../../App.scss";
import CreateUserManagement from "./CreateUserManagement";
import EditUserManagement from "./EditUserManagement";
import ReactPaginate from "react-paginate";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getUser,
  deleteUser,
  postUserCSV,
} from "../../../services/UserService";
import Papa from "papaparse";

function UserManagement() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Gọi API để lấy dữ liệu khi tải component
    getUser()
      .then((userData) => {
        if (Array.isArray(userData)) {
          setData(userData);
        } else {
          console.error("Data is not an array:", userData);
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleUpdateTable = () => {
    // You can update your table here
    getUser().then((userData) => {
      setData(userData);
    });
  };

  const handleUpdateUserFromModal = (user) => {
    console.error(">> Check handleUpdateUserFromModal", user);
  };

  const handleSelect = (user) => {
    if (selectedItems.includes(user)) {
      setSelectedItems(selectedItems.filter((item) => item !== user));
    } else {
      setSelectedItems([...selectedItems, user]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data);
    }
  };

  const deleteSelectedUser = () => {
    deleteUser(selectedItems)
      .then(() => {
        handleUpdateTable();
        setSelectedItems([]);
      })
      .catch((error) => {
        console.error("Error deleting users:", error);
      });
  };

  const handleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept CSV file!");
        return;
      }

      Papa.parse(file, {
        complete: function (results) {
          const rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (
              rawCSV[0] &&
              rawCSV[0].length === 3 &&
              rawCSV[0][0] === "username" &&
              rawCSV[0][1] === "email" &&
              rawCSV[0][2] === "group"
            ) {
              const newData = [...data];
              rawCSV.slice(1).forEach((item) => {
                if (item.length === 3) {
                  const user = {
                    username: item[0],
                    email: item[1],
                    group: item[2],
                  };

                  if (
                    !newData.some(
                      (existingUser) => existingUser.username === user.username
                    )
                  ) {
                    newData.push(user);
                  }
                }
              });

              setData(newData);
              console.log(">> Check newData: ", newData);

              // Send the updated data to the API
              handleImportUser(newData);
            } else {
              toast.error("Wrong format CSV file!");
            }
          } else {
            toast.error("Not found data in CSV file!");
          }
        },
      });
    }
  };

  const handleImportUser = async (newData) => {
    try {
      const res = await postUserCSV(newData); // Adjust the API call here
      console.log(res);
      if (typeof data === "string") {
        if (res === "User already") {
          toast.error("User already exists");
        } else if (res === "Add user succeed") {
          toast.success("User created successfully!");
          await handleUpdateTable(newData);
          saveDataToAPI(newData);
        } else {
          console.error("API response:", res);
          toast.error("Error!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveDataToAPI = (newData) => {
    // Send a POST request to your server's API endpoint for data insertion
    fetch("https://hpid.homethang.duckdns.org/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
          ? JSON.parse(localStorage.token)?.token
          : null,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.message === "Add done") {
          console.log("Data has been successfully saved to the database.");
          // Fetch the updated user data from the server and update the state
          getUser()
            .then((userData) => {
              if (Array.isArray(userData)) {
                setData(userData);
              } else {
                console.error("Data is not an array:", userData);
              }
            })
            .catch((error) => {
              console.error("Error loading data:", error);
            });
        } else {
          console.error("Server returned an unexpected response:", data);
        }
      })
      .catch((error) => {
        console.error("Error while saving data to the database:", error);
      });
  };

  return (
    <>
      <div className="administrator-table">
        <h2>User Management</h2>
        <div className="button-action">
          <div className="btn-delete-add">
            <button
              className="btn btn-danger d-flex align-items-center"
              onClick={() => {
                if (window.confirm("Are You Sure?")) {
                  deleteSelectedUser();
                }
              }}
              disabled={selectedItems.length === 0}
            >
              <AiFillDelete />
            </button>
            <div>
              <CreateUserManagement handleUpdateTable={handleUpdateTable} />
            </div>
          </div>
          <label
            className="btn btn-warning d-flex align-items-center gap-2"
            htmlFor="import"
          >
            <MdCreateNewFolder />
            <span>Import</span>
          </label>
          <input
            type="file"
            id="import"
            hidden
            onChange={(e) => handleImportCSV(e)}
          />
        </div>
        {data ? (
          <>
            <table>
              <thead>
                <tr>
                  <th className="col-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === data.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="col-3 name-col">USERNAME</th>
                  <th className="col-3 name-col">EMAIL</th>
                  <th className="col-3 name-col">GROUP</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((user, index) => (
                    <tr key={index}>
                      <td className="table-data">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(user)}
                          onChange={() => handleSelect(user)}
                        />
                      </td>
                      <td className="table-data adminname-item">
                        {editingUserId === user.id ? (
                          <>
                            <span onClick={() => handleEditUser(user.id)}>
                              {user.username}
                            </span>
                            <div>
                              <EditUserManagement
                                handleUpdateUserFromModal={
                                  handleUpdateUserFromModal
                                }
                                dataUserEdit={user}
                              />
                            </div>
                          </>
                        ) : (
                          <span onClick={() => handleEditUser(user.id)}>
                            {user.username}
                          </span>
                        )}
                      </td>
                      <td className="table-data">{user.email}</td>
                      <td className="table-data">{user.group}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </>
        ) : (
          <p className="text-load">Loading...</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default UserManagement;
