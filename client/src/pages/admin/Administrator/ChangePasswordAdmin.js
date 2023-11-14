import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { changePassAdmin } from "../../../services/AdminService";
import { isFormChangePassValid } from "../../../validations/AdminValidation";
export default function ChangePasswordAdmin(props) {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [show, setShow] = useState(false);
  const { dataAdminEdit, handleUpdateAdminFromModal } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditAdmin = async () => {
    if (password !== confirmpassword) {
      toast.error("Password and Confirm Password must match");
    } else {
      const response = await changePassAdmin(password, confirmpassword);
      if (response && response.adminname) {
        handleUpdateAdminFromModal({
          password: password,
          id: dataAdminEdit.id,
          confirmpassword: confirmpassword,
        });
      }
      toast.success("Admin edited successfully!");
      console.log(response);
      window.location.reload();
    }
  };

  return (
    <>
      <div onClick={handleShow}>
        {/* <AiFillEdit /> */}
        Change Password
      </div>
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          <Button
            variant="primary"
            onClick={handleEditAdmin}
            disabled={!isFormChangePassValid(password, confirmpassword)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
