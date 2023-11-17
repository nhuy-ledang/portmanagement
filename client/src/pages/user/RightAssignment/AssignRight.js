import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit } from "react-icons/ai";
import { patchUserRight, getOptions  } from "../../../services/UserService";
import {isFormEditRightValid} from "../../../validations/RightValidation"
export default function AssignRight(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [right, setRight] = useState("");
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]); 
  const { dataUserRightEdit, handleUpdateUserRightFromModal } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show && dataUserRightEdit) {
      setUsername(dataUserRightEdit.username);
      setEmail(dataUserRightEdit.email);
      setGroup(dataUserRightEdit.group);
      setRight(dataUserRightEdit.right);
    }
  }, [dataUserRightEdit, show]);
 
    useEffect(() => {
        getOptions()
        .then((options) => {
          setOptions(options);
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
        });
    }, []);


  const handleEditUser = async () => {
    try {
      const response = await patchUserRight(username, email, group, right);
      if (response && response.username) {
        handleUpdateUserRightFromModal({
          username: username,
          email: email,
          group: group,
          id: dataUserRightEdit.id,
          right: right,
        });
      }
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Assign Right</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={username}
                disabled
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Right</label>
              <select
                className="form-select"
                value={right}
                onChange={(e) => setRight(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.id} value={option.right}>
                    {option.right}
                  </option>
                ))}
              </select>
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
            disabled={!isFormEditRightValid(right)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}