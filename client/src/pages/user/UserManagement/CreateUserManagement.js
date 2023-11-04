import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { IoMdCreate } from 'react-icons/io';

export default function CreateAdministrator(props) {
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [show, setShow] = useState(false);
  const { handleUpdateTable } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postCreateAdmin = async () => {
    const data = { adminname, email, password, confirmpassword, fullname };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.token).token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed with status code " + response.status);
      }

      const responseData = await response.text();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // const handleSaveAdmin = async () => {
  //   try {
  //     // Validate data before sending
  //     if (!adminname || !email || !password || !confirmpassword || !fullname) {
  //       toast.error("Please fill in all the required information.");
  //       return;
  //     }

  //     const res = await postCreateAdmin();
  //     if (res === "Admin already exists") {
  //       toast.error("Admin already exists!");
  //     } else if (res === "Add admin succeed") {
  //       handleClose();
  //       setAdminname("");
  //       setEmail("");
  //       setPassword("");
  //       setConfirmpassword("");
  //       setFullname("");
  //       toast.success("Admin created successfully!");

  //       // Call the parent's update function
  //       handleUpdateTable({
  //         adminname,
  //         email,
  //         password,
  //         confirmpassword,
  //         fullname,
  //       });
  //     } else {
  //       toast.error("Error!");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const handleSaveAdmin = async () => {
    try {
      let errorMessage = null;
  
      if (!adminname) {
        errorMessage = "Please fill in the Administrator field.";
      } else if (!email) {
        errorMessage = "Please fill in the Email field.";
      } else if (!password) {
        errorMessage = "Please fill in the Password field.";
      } else if (!confirmpassword) {
        errorMessage = "Please fill in the Confirm Password field.";
      } else if (!fullname) {
        errorMessage = "Please fill in the Full Name field.";
      }
  
      if (errorMessage) {
        toast.error(errorMessage);
        return;
      }
  
      const res = await postCreateAdmin();
      switch (res) {
        case "Admin already exists":
          toast.error("Admin already exists!");
          break;
        case "Add admin succeed":
          handleClose();
          setAdminname("");
          setEmail("");
          setPassword("");
          setConfirmpassword("");
          setFullname("");
          toast.success("Admin created successfully!");
  
          // Call the parent's update function
          handleUpdateTable({
            adminname,
            email,
            password,
            confirmpassword,
            fullname,
          });
          break;
        default:
          toast.error("An error occurred while creating the admin.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };
  

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <IoMdCreate />
      </Button>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Administrator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Administrator</label>
              <input
                type="text"
                className="form-control"
                value={adminname}
                onChange={(e) => setAdminname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAdmin}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
