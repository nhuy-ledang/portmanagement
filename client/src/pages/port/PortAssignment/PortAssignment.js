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

  // useEffect(() => {
  //   getAdmin().then((adminData) => setData(adminData));
  // }, []);

  useEffect(() => {
    getPort().then((adminData) => {
      if (Array.isArray(adminData)) {
        setData(adminData);
      } else {
        console.error("Data is not an array:", adminData);
      }
    });
  }, []);

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
                  .map((admin) => (
                    <tr key={admin.portid}>
                      <td className="table-data">{admin.portname}</td>
                      <td className="table-data">
                        {admin.layout[0]?.layoutname}
                      </td>
                      <td className="table-data">{admin.user[0]?.username}</td>
                      <td className="table-data">{admin.right[0]?.right}</td>
                      <td className="table-data">{admin.status}</td>
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
