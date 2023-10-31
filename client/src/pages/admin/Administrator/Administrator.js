import React, { useEffect, useState } from "react";
import "./Administrator.scss";
import { Button } from "react-bootstrap";
import CreateAdministrator from "./CreateAdministrator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAdministrator from "./EditAdministrator";
import ReactPaginate from "react-paginate";

export default function Administrator() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Số lượng dòng hiển thị trên mỗi trang

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

  // Tính toán số trang
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;

  // Lấy dữ liệu hiện tại trên trang
  const currentData = data
    ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  // Xử lý sự kiện chuyển trang
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="administrator-table">
        <h1>Administrator Management</h1>
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
                  <th className="col-3">ADMINISTRATOR</th>
                  <th className="col-3">EMAIL</th>
                  <th className="col-3">FULL NAME</th>
                  <th className="col-3"></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((admin, index) => (
                  <tr key={index}>
                    <td className="table-data">{admin.adminname}</td>
                    <td className="table-data">{admin.email}</td>
                    <td className="table-data">{admin.fullname}</td>
                    <td className="table-data table-button">
                      <EditAdministrator handleUpdateTable={handleUpdateTable}/>
                      <Button variant="danger">Delete</Button>{" "}
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
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}