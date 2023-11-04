import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { IoMdCreate } from 'react-icons/io';
import {isFormValid, isValidEmail} from '../../../formValidation'
export default function CreateAdministrator(props) {
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [show, setShow] = useState(false);
  const { handleUpdateTable } = props;
  const handleClose = () => {
    setShow(false);
    // Reset the form fields
    setAdminname("");
    setEmail("");
    setPassword("");
    setConfirmpassword("");
    setFullname("");
  };

  const handleShow = () => setShow(true);

  const isFormValid = () => {
    return (
      adminname.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmpassword.trim() !== "" &&
      fullname.trim() !== ""
    );
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

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

  const handleSaveAdmin = async () => {
    if (isFormValid(adminname, email, password, confirmpassword, fullname) && isValidEmail(email)) {
      if (password !== confirmpassword) {
        toast.error("Password and Confirm Password must match");
      } else {
        try {
          const res = await postCreateAdmin();
          console.log(res);
          if (res === "Admin already") {
            toast.error("Admin already exists");
          } else if (res === "Add admin succeed") {
            handleClose();
            toast.success("Admin created successfully!");
            await handleUpdateTable({
              adminname,
              email,
              password,
              confirmpassword,
              fullname,
            });
          } else {
            toast.error("Error!");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <IoMdCreate />
      </Button>
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
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
                type="email"
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
                type="text"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="text"
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
          <Button variant="primary" onClick={handleSaveAdmin} disabled={!isFormValid()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
