import React, { useEffect, useState } from "react";
import "./Administrator.scss";
import CreateAdministrator from "./CreateAdministrator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAdministrator from "./EditAdministrator";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";

export default function Administrator() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const [selectedItems, setSelectedItems] = useState([]);
  const [editingAdminId, setEditingAdminId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.token).token,
      };

      const response = await fetch(
        "https://hpid.homethang.duckdns.org/api/admin",
        { headers }
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEditAdmin = (adminId) => {
    setEditingAdminId(adminId);
  };

  const handleUpdateTable = (admin) => {
    setData([admin, ...data]);
  };

  const handleUpdateAdminFromModal = (admin) => {
    console.error(">> Check handleUpdateAdminFromModal", admin);
  };

  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const currentData =
    data && Array.isArray(data)
      ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : [];

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSelect = (admin) => {
    if (selectedItems.includes(admin)) {
      setSelectedItems(selectedItems.filter((item) => item !== admin));
    } else {
      setSelectedItems([...selectedItems, admin]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData);
    }
  };

  const handleDelete = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.token).token,
    };

    // Create an array of promises for each selected item to be deleted
    const deletePromises = selectedItems.map((admin) => {
      const data = {
        adminname: admin.adminname,
      };
      return axios.delete("https://hpid.homethang.duckdns.org/api/admin", {
        headers,
        data,
      });
    });

    // Execute all the delete promises
    Promise.all(deletePromises)
      .then(() => {
        console.log("Admins have been successfully deleted");
        fetchData();
        setSelectedItems([]); // Clear the selected items
      })
      .catch((error) => {
        console.error("Error deleting admins:", error);
      });
  };

  return (
    <>
      <div className="administrator-table">
        <h2>Administrator Management</h2>
        <div className="button-action">
          <div className="btn-delete-add">
            <button
              className="btn btn-danger d-flex align-items-center"
              onClick={() => {
                if (window.confirm("Are You Sure?")) {
                  handleDelete();
                }
              }}
              disabled={selectedItems.length === 0} // Disable the button when no items are selected
            >
              <AiFillDelete />
            </button>
            <div>
              <CreateAdministrator handleUpdateTable={handleUpdateTable} />
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
                      checked={selectedItems.length === currentData.length} // Check if all items are selected
                      onChange={handleSelectAll} // Call handleSelectAll when the checkbox is changed
                    />
                  </th>
                  <th className="col-3 name-col">ADMINISTRATOR</th>
                  <th className="col-3 name-col">EMAIL</th>
                  <th className="col-3 name-col">FULL NAME</th>
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
                      {editingAdminId === admin.id ? (
                        <>
                          <span onClick={() => handleEditAdmin(admin.id)}>
                            {admin.adminname}
                          </span>
                          <div>
                            <EditAdministrator
                              handleUpdateAdminFromModal={
                                handleUpdateAdminFromModal
                              }
                              dataAdminEdit={admin}
                            />
                          </div>
                        </>
                      ) : (
                        <span onClick={() => handleEditAdmin(admin.id)}>
                          {admin.adminname}
                        </span>
                      )}
                    </td>
                    <td className="table-data">{admin.email}</td>
                    <td className="table-data">{admin.fullname}</td>
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
