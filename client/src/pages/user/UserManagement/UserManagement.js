import React, { useEffect, useState } from "react";
import "../../../App.scss";
import CreateUserManagement from "./CreateUserManagement";
import EditUserManagement from "./EditUserManagement";
import ReactPaginate from "react-paginate";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getUser,
  deleteUser,
} from "../../../services/UserService";

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
