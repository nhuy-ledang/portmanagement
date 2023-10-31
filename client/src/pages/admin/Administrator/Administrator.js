import React, { useEffect, useState } from "react";
import "./Administrator.scss";
import { Button } from "react-bootstrap";
import CreateAdministrator from "./CreateAdministrator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Administrator() {
  const [administrator, setAdministrator] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=2");
        const json = await response.json();
        setAdministrator(json.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div className="administrator-table">
        <h1>Administrator Management</h1>
        <div className="aaaa">
          <div>
            <CreateAdministrator />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="col-1">ID</th>
              <th className="col-4">ADMINISTRATOR</th>
              <th className="col-2">EMAIL</th>
              <th className="col-2">FULL NAME</th>
              <th className="col-5"></th>
            </tr>
          </thead>
          <tbody>
            {administrator.map((user) => (
              <tr key={user.id}>
                <td className="table-data">{user.id}</td>
                <td className="table-data">{user.email}</td>
                <td className="table-data">{user.first_name}</td>
                <td className="table-data">{user.last_name}</td>
                <td className="table-data table-button">
                  <Button variant="primary">Edit</Button>{" "}
                  <Button variant="danger">
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
