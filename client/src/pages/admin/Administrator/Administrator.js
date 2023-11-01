import React, { useEffect, useState } from "react";
import "./Administrator.scss";
import { Button } from "react-bootstrap";
import CreateAdministrator from "./CreateAdministrator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAdministrator from "./EditAdministrator";
import ReactPaginate from "react-paginate";
import axios from 'axios';

export default function Administrator() {
  const [data, setData] = useState(null);
  const [dataAdminEdit, setDataAdminEdit] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ADMIN_API = "http://homethang.duckdns.org:3000/api/admin";
      const headers = {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.token).token,
      };

      const response = await fetch(ADMIN_API, { headers });
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

  const currentData = data && Array.isArray(data)
    ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  // Xử lý sự kiện chuyển trang
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditAdmin = (admin) => {
    console.log(">> check edit admin", admin);
    setDataAdminEdit(admin);
  };

  const handleDelete = (adminname) => {
    const apiUrl = "http://homethang.duckdns.org:3000/api/admin";
    const headers = {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.token).token,
    };
    const data = {
      adminname: adminname,
    };

    axios
      .delete(apiUrl, { headers, data })
      .then((response) => {
        console.log("Admin đã được xóa thành công");
        fetchData();
      })
      .catch((error) => {
        console.error("Lỗi xóa admin:", error);
      });
  };

  return (
    <>
      <div className="administrator-table">
        <h2>Administrator Management</h2>
        <div className="aaaa">
          <div>
            <CreateAdministrator handleUpdateTable={handleUpdateTable} />
          </div>
        </div>
        {data ? (
          <>
            <table>
              <thead>
                <tr>
                  {/* <th className="col-1">ID</th> */}
                  <th className="col-3">ADMINISTRATOR</th>
                  <th className="col-3">EMAIL</th>
                  <th className="col-3">FULL NAME</th>
                  <th className="col-3"></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((admin) => (
                  <tr key={admin.id}>
                    {/* <td className="table-data">{admin.id}</td> */}
                    <td className="table-data">{admin.adminname}</td>
                    <td className="table-data">{admin.email}</td>
                    <td className="table-data">{admin.fullname}</td>
                    <td className="table-data table-button">
                      <Button onClick={() => handleEditAdmin(admin)}>
                        <EditAdministrator
                          handleUpdateAdminFromModal={handleUpdateAdminFromModal}
                          dataAdminEdit={dataAdminEdit}
                        />
                      </Button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (window.confirm('Are You Sure?')) {
                            handleDelete(admin.adminname);
                          }
                        }}
                      >
                        Delete
                      </button>
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