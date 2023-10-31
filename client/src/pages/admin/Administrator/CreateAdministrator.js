import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

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
    const url = "http://homethang.duckdns.org:3000/api/admin";
    const data = { adminname, email, password, confirmpassword, fullname };

    try {
      const response = await fetch(url, {
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
    try {
      const res = await postCreateAdmin();
      console.log(res);
      if (res === "Admin already exists") {
        toast.error("Admin đã tồn tại!");
      } else if (res === "Add admin succeed") {
        handleClose();
        setAdminname("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
        setFullname("");
        toast.success("Admin được tạo thành công!");
        await handleUpdateTable({
          adminname,
          email,
          password,
          confirmpassword,
          fullname,
        });
      } else {
        toast.error("Lỗi!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Create
      </Button>{" "}
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
          <Button variant="primary" onClick={handleSaveAdmin}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}