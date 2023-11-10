import React, { useEffect, useState } from "react";
import "../../../App.scss";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPort } from "../../../services/PortService";

function PortAssignment() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    getPort()
      .then((portData) => {
        if (Array.isArray(portData)) {
          setData(portData);
        } else {
          console.log("Invalid data format:", portData);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Error loading data:", error);
      });
  }, [currentPage]);

  return (
    <>
      <div className="administrator-table">
        <h2>Port Assignment</h2>
        <div className="button-action"></div>
        {data ? (
          <>
            <table>
              <thead>
                <tr>
                  <th className="col-3 name-col">PORT NAME</th>
                  <th className="col-3 name-col">LAYOUT NAME</th>
                  <th className="col-3 name-col">USER</th>
                  <th className="col-3 name-col">RIGHT</th>
                  <th className="col-3 name-col">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((port) => (
                    <tr key={port.portid}>
                      <td className="table-data">{port.portname}</td>
                      <td className="table-data">
                        {port.layout[0]?.layoutname}
                      </td>
                      <td className="table-data">{port.user[0]?.username}</td>
                      <td className="table-data">{port.right[0]?.right}</td>
                      <td className="table-data">{port.status}</td>
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

export default PortAssignment;
