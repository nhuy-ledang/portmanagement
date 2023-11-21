import React, { useEffect, useState } from "react";
import "./Home.scss";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getHomeLayout, getHomePort } from "../services/HomeService";

function Home() {
  const [layoutData, setLayoutData] = useState(null);
  const [portData, setPortData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = layoutData
    ? Math.ceil(layoutData.length / itemsPerPage)
    : 0;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const token = localStorage.token
    ? JSON.parse(localStorage.token)?.token
    : null;

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const layoutData = await getHomeLayout(token);
        setLayoutData(layoutData);

        const portData = await getHomePort(token);
        setPortData(portData);

        console.log(
          "Layout names:",
          layoutData.map((layout) => layout.layoutname)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataAndUpdateState();
  }, [token]);

  return (
    <>
      <div className="layout-table">
        <h2>Home Page</h2>
        {layoutData ? (
          <>
            {layoutData
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
              .map((layout) => (
                <div key={layout.id} className="d-flex home-table">
                  <table className="col">
                    <thead>
                      <tr>
                        <th className="col-1">{layout.layoutname}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-data">
                          <img
                            className="img-layout"
                            src={`${process.env.REACT_APP_API_URL_IMAGE}/${layout.layoutdir}`}
                            alt={layout.layoutname}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="col">
                    <thead>
                      <tr>
                        <th className="col-1">PORTNAME</th>
                        <th className="col-1">EMAIL</th>
                        <th className="col-1">RIGHT</th>
                        <th className="col-1">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portData &&
                        portData
                          .filter((port) =>
                            port.layout.some(
                              (l) => l.layoutname === layout.layoutname
                            )
                          )
                          .map((port) => (
                            <tr key={port.portid}>
                              <td className="table-data">{port.portname}</td>
                              <td className="table-data">
                                {port.user[0].email}
                              </td>
                              <td className="table-data">
                                {port.right[0]?.right
                                  ? port.right[0]?.right
                                  : "N/A"}
                              </td>
                              <td className="table-data">{port.status}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              ))}
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

export default Home;
