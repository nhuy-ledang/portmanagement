import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { patchPort } from "../../../services/PortService";
import { toast } from "react-toastify";
import {
  getLayoutOptions,
  getUserOptions,
} from "../../../services/PortService";

export default function AssignPort(props) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { dataPortEdit, handleUpdatePortFromModal } = props;
  const [portname, setPortname] = useState("");
  const [layoutname, setLayoutname] = useState(dataPortEdit.layoutname || "");
  const [username, setUsername] = useState(dataPortEdit.username || "");
  const [right, setRight] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [layoutOptions, setLayoutOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedRight, setSelectedRight] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const layoutOptionsData = await getLayoutOptions();
        const userOptionsData = await getUserOptions();
        setPortname(dataPortEdit.portname);
        setLayoutname(dataPortEdit.layoutname);
        setUsername(dataPortEdit.username);
        setLayoutOptions(layoutOptionsData);
        setUserOptions(userOptionsData);
        setRight(dataPortEdit.right[0]?.right);
        setStatus(dataPortEdit.status);
        setSelectedRight(dataPortEdit.right[0]?.right);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [dataPortEdit]);

  const handleEditPort = async () => {
    console.log("Port Name:", portname);
    console.log("Layout Name:", layoutname);
    console.log("User Name:", username);
    console.log("Right:", selectedRight);
    console.log("Status:", status);
    console.log("              ");
  
    const response = patchPort(
      portname,
      layoutname,
      username,
      status
    );
  
    if (response && response.portname) {
      // Fetch the updated options for the specific user
      try {
        const updatedOptions = await getUserOptions(username);
        const selectedOption = updatedOptions.find(
          (option) => option.username === username
        );
        if (selectedOption) {
          const updatedRight = selectedOption.right[0]?.right;
          setSelectedRight(updatedRight);
        }
      } catch (error) {
        console.error("Error fetching updated right:", error);
      }
  
      handleUpdatePortFromModal({
        portname: portname,
        id: dataPortEdit.portid,
        layoutname: layoutname,
        username: username,
        status: status,
      });
    }
  
    toast.success("Port edited successfully!");
    handleClose();
    console.log(response);
  };

  useEffect(() => {
    if (selectedUsername) {
      getUserOptions()
        .then((options) => {
          const selectedOption = options.find(
            (option) => option.username === selectedUsername
          );
          if (selectedOption) {
            const right = selectedOption.right[0]?.right;
            setSelectedRight(right);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedUsername]);

  const handleUsernameSelect = async (event) => {
    const { value } = event.target;
    setSelectedUsername(value);
    setUsername(value);
    try {
      const options = await getUserOptions();
      const selectedOption = options.find(
        (option) => option.username === value
      );
      if (selectedOption) {
        const right = selectedOption.right[0]?.right;
        setSelectedRight(right);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Assign Port</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Port Name</label>
              <input
                type="text"
                className="form-control"
                value={portname}
                disabled
                onChange={(e) => setPortname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Layout Name</label>
              <select
                className="form-select"
                value={layoutname}
                onChange={(e) => setLayoutname(e.target.value)}
              >
                {layoutOptions.map((option) => (
                  <option key={option.id} value={option.layoutname}>
                    {option.layoutname}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <select
                className="form-select"
                value={selectedUsername}
                onChange={handleUsernameSelect}
              >
                {userOptions.map((option) => (
                  <option key={option.id} value={option.username}>
                    {option.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Right</label>
              <input
                type="text"
                className="form-control"
                value={selectedRight}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {status === "DOWN" ? (
                  <>
                    <option value="DOWN">DOWN</option>
                    <option value="UP">UP</option>
                  </>
                ) : (
                  <>
                    <option value="UP">UP</option>
                    <option value="DOWN">DOWN</option>
                  </>
                )}
              </select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditPort}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
