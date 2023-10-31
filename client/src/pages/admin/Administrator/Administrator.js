import React, { useEffect, useState } from "react";
import "./Administrator.scss";
import { Button } from "react-bootstrap";
import CreateAdministrator from "./CreateAdministrator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Administrator() {
  const [data, setData] = useState(null);

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

  const handleUpdateTable = (admin)  => {
    setData([admin, ...data]);
  }

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
              {data.map((admin, index) => (
                <tr key={index}>
                  <td className="table-data">{admin.adminname}</td>
                  <td className="table-data">{admin.email}</td>
                  <td className="table-data">{admin.fullname}</td>
                  <td className="table-data table-button">
                    <Button variant="primary">Edit</Button>{" "}
                    <Button variant="danger">Delete</Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
