import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
export default function EditAdministrator(props) {
  const [id, setId] = useState("");
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [show, setShow] = useState(false);
  const { dataAdminEdit } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const putUpdateAdmin = ( adminname, email, fullname) => {
    return axios.patch(`http://homethang.duckdns.org:3000/api/admin/${id}`, {adminname, email, fullname})
}

  useEffect(() => {
    if (show) {
      setAdminname(dataAdminEdit.adminname);
      setEmail(dataAdminEdit.email);
      setFullname(dataAdminEdit.fullname);
    }
  }, [dataAdminEdit, show]);

  const handleEditAdmin = async () => {
    // try {
    //   const response = await putUpdateAdmin(
    //     dataAdminEdit.id,
    //     adminname,
    //     email,
    //     fullname
    //   );
    //   console.log(response.message);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    let response = await putUpdateAdmin(
      adminname,
      email,
      fullname
    );
    console.log(">> check handleEditAdmin", response);
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
          <Button variant="primary" onClick={handleEditAdmin}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}