import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit } from 'react-icons/ai'; 
export default function EditAdministrator(props) {
  // const [id, setId] = useState("");
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [show, setShow] = useState(false);
  const { dataAdminEdit, handleUpdateAdminFromModal } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const putUpdateAdmin = async () => {
    const data = { adminname, email, fullname };

    try {
      const response = await fetch( "http://homethang.duckdns.org:3000/api/admin", {
        method: "PATCH",
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

  useEffect(() => {
    if (show) {
      setAdminname(dataAdminEdit.adminname);
      setEmail(dataAdminEdit.email);
      setFullname(dataAdminEdit.fullname);
    }
  }, [dataAdminEdit, show]);

  const handleEditAdmin = async () => {
    const response = await putUpdateAdmin(adminname, email, fullname);
    if (response && response.adminname) {
      handleUpdateAdminFromModal({
        adminname: adminname,
        id: dataAdminEdit.id,
        email: email,
        fullname: fullname,
      }); 
       
    }
    console.log(response);
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <AiFillEdit />
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
                disabled
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
          <Button variant="primary" onClick={handleEditAdmin}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}