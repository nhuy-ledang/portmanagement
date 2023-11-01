import React, { useEffect, useState } from "react";
import "./Administrator.scss";
import CreateAdministrator from "./CreateAdministrator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAdministrator from "./EditAdministrator";
import ReactPaginate from "react-paginate";
import axios from "axios";

export default function Administrator() {
  const [data, setData] = useState(null);
  const [dataAdminEdit, setDataAdminEdit] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const [selectedItems, setSelectedItems] = useState([]);

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
        "http://homethang.duckdns.org:3000/api/admin",
        { headers }
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error:", error);
    }
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

  const handleEditAdmin = (admin) => {
    console.log(">> check edit admin", admin);
    setDataAdminEdit(admin);
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
      return axios.delete("http://homethang.duckdns.org:3000/api/admin", {
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
          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Are You Sure?")) {
                handleDelete();
              }
            }}
            disabled={selectedItems.length === 0} // Disable the button when no items are selected
          >
            DELETE
          </button>
          <div>
            <CreateAdministrator handleUpdateTable={handleUpdateTable} />
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
                      checked={selectedItems.length === currentData.length} // Check if all items are selected
                      onChange={handleSelectAll} // Call handleSelectAll when the checkbox is changed
                    />
                  </th>
                  <th className="col-3">ADMINISTRATOR</th>
                  <th className="col-3">EMAIL</th>
                  <th className="col-3">FULL NAME</th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((admin) => (
                  <tr key={admin.id}>
                    <td className="table-data">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(admin)} // Check if the item is selected
                        onChange={() => handleSelect(admin)} // Call handleSelect when the checkbox is changed
                      />
                    </td>
                    <td className="table-data">{admin.adminname}</td>
                    <td className="table-data">{admin.email}</td>
                    <td className="table-data">{admin.fullname}</td>
                    <td className="table-data table-button">
                      <div onClick={() => handleEditAdmin(admin)}>
                        <EditAdministrator
                          handleUpdateAdminFromModal={
                            handleUpdateAdminFromModal
                          }
                          dataAdminEdit={dataAdminEdit}
                        />
                      </div>
                      
                    </td>
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
          <p>Loading...</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
