import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default function EditAdministrator(props) {
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [show, setShow] = useState(false);
  const { admin, handleUpdateTable } = props;

  useEffect(() => {
    if (admin) {
      setAdminname(admin.adminname);
      setEmail(admin.email);
      setFullname(admin.fullname);
    }
  }, [admin]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postUpdateAdmin = async () => {
    const url = `http://homethang.duckdns.org:3000/api/admin/${admin.adminId}`;
    const data = { adminname, email, fullname };

    try {
      const response = await fetch(url, {
        method: "PUT",
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

  const handleUpdateAdmin = async () => {
    try {
      const res = await postUpdateAdmin();
      console.log(res);
      if (res === "Update admin succeed") {
        handleClose();
        toast.success("Thông tin người quản trị đã được cập nhật!");
        await handleUpdateTable(admin.adminId, {
          adminname,
          email,
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
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>{" "}
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Edit Administrator</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateAdmin}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}