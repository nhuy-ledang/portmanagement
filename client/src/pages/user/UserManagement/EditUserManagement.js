import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit } from 'react-icons/ai'; 
export default function EditUserManagement(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [show, setShow] = useState(false);
  const { dataUserEdit, handleUpdateUserFromModal } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const putUpdateAdmin = async () => {
    const data = { username, email, group };

    try {
      const response = await fetch( `${process.env.REACT_APP_API_URL}/user`, {
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
      setUsername(dataUserEdit.username);
      setEmail(dataUserEdit.email);
      setGroup(dataUserEdit.group);
    }
  }, [dataUserEdit, show]);

  const handleEditUser = async () => {
    const response = await putUpdateAdmin(username, email, group);
    if (response && response.username) {
      handleUpdateUserFromModal({
        username: username,
        id: dataUserEdit.id,
        email: email,
        fullname: group,
      }); 
       
    }
    console.log(response);
    window.location.reload();
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        <AiFillEdit onClick={handleShow}/>
      </Button>{" "} */}
      <AiFillEdit onClick={handleShow}/>
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <label className="form-label">Group</label>
              <input
                type="text"
                className="form-control"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}