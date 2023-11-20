import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { isFormEditValid } from "../../../validations/UserValidation";
import { patchUser } from "../../../services/UserService";
import { toast } from "react-toastify"; 

export default function EditUserManagement(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [show, setShow] = useState(false);
  const { dataUserEdit, handleUpdateUserFromModal } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      setUsername(dataUserEdit.username);
      setEmail(dataUserEdit.email);
      setGroup(dataUserEdit.group);
    }
  }, [dataUserEdit, show]);

  const handleEditUser = async () => {
    const response = await patchUser(username, email, group);
    if (response && response === "Edit user done") {
      handleUpdateUserFromModal({
        username: username,
        id: dataUserEdit.id,
        email: email,
        group: group,
      });
    }
    handleClose();
    toast.success("User edited successfully!");
    console.log(response);
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">User Name</label>
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
          <Button
            variant="primary"
            onClick={handleEditUser}
            disabled={!isFormEditValid(username, email, group)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
