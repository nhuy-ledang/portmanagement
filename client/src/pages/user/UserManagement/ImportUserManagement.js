import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { MdCreateNewFolder } from "react-icons/md";
import { getUser } from "../../../services/UserService";
export default function ImportUserManagement(props) {
  const [show, setShow] = useState(false);
  const { handleUpdateTable } = props;
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const token = localStorage.token
    ? JSON.parse(localStorage.token).token
    : null;
  const urlImportCSV = `${process.env.REACT_APP_API_URL}/user?csv=true`;

  useEffect(() => {
    getUser();
  }, []);

  const handleFileUpload = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(selectedFile);
    console.log(file);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };

    delete options.headers["Content-Type"];

    fetch(urlImportCSV, options)
      .then((response) => {
        if (response.ok) {
          toast.success("Import successful!");
          handleUpdateTable();
          handleClose();
          window.location.reload();
        }
        else {
          toast.error("Import failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during file upload:", error);
        toast.error("An error occurred during file upload. Please try again.");
      });
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow} className="text-white d-flex align-items-center gap-2">
        <MdCreateNewFolder />
        <span className="">Import</span>
      </Button>
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Import User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">File</label>
              <input
                type="file"
                className="form-control"
                ref={fileInputRef}
                onChange={() => setFile(fileInputRef.current.files[0])}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
