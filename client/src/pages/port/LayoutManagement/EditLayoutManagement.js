import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { patchLayout } from "../../../services/LayoutService";
export default function EditLayoutManagement(props) {
  const [layoutname, setLayoutname] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const { dataLayoutEdit, handleUpdateAdminFromModal } = props;
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setLayoutname("");
    setImage(null);
  };

  useEffect(() => {
    if (show && dataLayoutEdit) {
      setLayoutname(dataLayoutEdit.layoutname);
      setImage(dataLayoutEdit.image);
    }
  }, [dataLayoutEdit, show]);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    } else {
      toast.error("Please select an image.");
    }
  };

  const handleEditLayout = () => {
    if (layoutname && image) {
      const token = localStorage.token
        ? JSON.parse(localStorage.token)?.token
        : null;

      patchLayout(layoutname, image, token)
        .then((res) => {
          console.log(">>> Response edit Layout: ", res);
          if (res === "Edit layout done") {
            handleUpdateAdminFromModal({
              layoutname: layoutname,
              id: dataLayoutEdit.id,
              layoutdir: image.name,
            });
            toast.success("Layout edited successfully!");
            window.location.reload();
          } else {
            console.error("Unexpected response:", res);
            toast.error("Error! Unexpected response");
          }
        })
        .catch((error) => {
          console.error(">> Error:", error);
          toast.error("Error! Check console for details");
        });
    } else {
      toast.error("Please enter a layout name and select an image.");
    }
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Edit Layout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Layout Name</label>
              <input
                type="text"
                className="form-control"
                value={layoutname}
                onChange={(e) => setLayoutname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Layout Image</label>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={handleImageUpload}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditLayout}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}