import React, { useEffect, useState } from "react";
import "../../../App.scss";
import EditRightAssignment from "./EditRightAssignment";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserRight } from "../../../services/UserService";

function RightAssignment() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [editingUserRightId, setEditingUserRightId] = useState(null);
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // useEffect(() => {
  //   getUserRight().then((userData) => setData(userData));
  // }, []);

  useEffect(() => {
    getUserRight().then((userData) => {
      if (Array.isArray(userData)) {
        setData(userData);
      } else {
        console.error("Data is not an array:", userData);
      }
    });
  }, []);

  const handleEditUserRight = (userId) => {
    setEditingUserRightId(userId);
  };

  const handleUpdateUserRightFromModal = (user) => {
    console.error(">> Check handleUpdateUserRightFromModal", user);
  };

  return (
    <>
      <div className="administrator-table">
        <h2>Right Assignment</h2>
        {data && data.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th className="col-3">USER NAME</th>
                  <th className="col-4 name-col">EMAIL</th>
                  <th className="col-3 name-col">GROUP</th>
                  <th className="col-2 name-col">RIGHT</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((user) => (
                    <tr key={user.id}>
                      <td className="table-data adminname-item">
                        {user && user.username ? (
                          editingUserRightId === user.id ? (
                            <>
                              <span onClick={() => handleEditUserRight(user.id)}>
                                {user.username}
                              </span>
                              <div>
                                <EditRightAssignment
                                  handleUpdateUserRightFromModal={
                                    handleUpdateUserRightFromModal
                                  }
                                  dataUserRightEdit={user}
                                />
                              </div>
                            </>
                          ) : (
                            <span onClick={() => handleEditUserRight(user.id)}>
                              {user.username}
                            </span>
                          )
                        ) : null}
                      </td>
                      <td className="table-data">{user && user.email}</td>
                      <td className="table-data">{user && user.group}</td>
                      <td className="table-data">{user && user.right}</td>
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

export default RightAssignment;
