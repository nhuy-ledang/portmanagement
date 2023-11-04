import React, { useEffect, useState } from "react";
import CreateUserManagement from "./CreateUserManagement";
import EditUserManagement from "./EditUserManagement";
import "./UserManagement.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";

export default function UserManagement() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const [selectedItems, setSelectedItems] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data User Management 
  const fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.token).token,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user`,
        { headers }
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEditUser = (adminId) => {
    setEditingUserId(adminId);
  };

  const handleUpdateTable = (admin) => {
    setData([admin, ...data]);
  };

  const handleUpdateUserFromModal = (admin) => {
    console.error(">> Check handleUpdateUserFromModal", admin);
  };

  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const currentData =
    data && Array.isArray(data)
      ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : [];

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Checkbox chọn 1 item => Dùng để delete
  const handleSelect = (admin) => {
    if (selectedItems.includes(admin)) {
      setSelectedItems(selectedItems.filter((item) => item !== admin));
    } else {
      setSelectedItems([...selectedItems, admin]);
    }
  };

  // Checkbox chọn tất cả item => Dùng để delete
  const handleSelectAll = () => {
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData);
    }
  };

  // Delete item
  const handleDelete = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.token).token,
    };

    // Create an array of promises for each selected item to be deleted
    const deletePromises = selectedItems.map((admin) => {
      const data = {
        username: admin.username,
      };
      return axios.delete(`${process.env.REACT_APP_API_URL}/user`, {
        headers,
        data,
      });
    });

    Promise.all(deletePromises)
      .then(() => {
        console.log("Users have been successfully deleted");
        fetchData();
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
                  handleDelete();
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
          <button className="btn btn-success d-flex align-items-center">
            <MdCreateNewFolder />
          </button>
        </div>
        {data ? (
          <>
            <table>
              <thead>
                <tr>
                  <th className="col-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === currentData.length} 
                      onChange={handleSelectAll} 
                    />
                  </th>
                  <th className="col-3 name-col">USERNAME</th>
                  <th className="col-3 name-col">EMAIL</th>
                  <th className="col-3 name-col">GROUP</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((admin) => (
                  <tr key={admin.id}>
                    <td className="table-data">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(admin)}
                        onChange={() => handleSelect(admin)}
                      />
                    </td>
                    <td className="table-data adminname-item">
                      {editingUserId === admin.id ? (
                        <>
                          <span onClick={() => handleEditUser(admin.id)}>
                            {admin.username}
                          </span>
                          <div>
                            <EditUserManagement
                              handleUpdateUserFromModal={
                                handleUpdateUserFromModal
                              }
                              dataUserEdit={admin}
                            />
                          </div>
                        </>
                      ) : (
                        <span onClick={() => handleEditUser(admin.id)}>
                          {admin.username}
                        </span>
                      )}
                    </td>
                    {/* <td className="table-data">{admin.id}</td> */}
                    {/* <td className="table-data">{admin.username}</td> */}
                    <td className="table-data">{admin.email}</td>
                    <td className="table-data">{admin.group}</td>
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
