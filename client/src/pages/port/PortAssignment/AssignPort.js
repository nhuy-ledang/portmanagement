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
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [layoutOptions, setLayoutOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

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
        setStatus(dataPortEdit.status);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [dataPortEdit]);





  // const handleEditPort = () => {
  //   console.log(portname);
  //   console.log(layoutname);
  //   console.log(username);
  //   console.log(status);
  //   const token = localStorage.token
  //   ? JSON.parse(localStorage.token)?.token
  //   : null;

  //   if (!layoutname) {
  //     if (!username) {
  //       console.log("No layoutname & No username");
  //     } else {
  //       console.log("No layoutname");
  //     }
  //     } else {
  //       console.log("OK");
  //     }

  // };

  const handleEditPort = () => {
    const token = localStorage.token
      ? JSON.parse(localStorage.token)?.token
      : null;
    console.log(portname);
    console.log(layoutname);
    console.log(username);
    console.log(status);

    if (layoutname) {
      console.log(">> layoutname: ", layoutname);
      if (username) {
        patchPort(portname, layoutname, username, status, token)
          .then((res) => {
            console.log(">>> Response edit Port: ", res);
            if (res === "Edit port done") {
              handleUpdatePortFromModal({
                portname: portname,
                layoutname: layoutname,
                username: username,
                status: status,
                id: dataPortEdit.id,
              });
              toast.success("Port edited successfully!");
              handleClose();
              // window.location.reload();
            } else {
              console.error("Unexpected response:", res);
              toast.error("Error! Unexpected response");
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error! Check console for details");
          });
      } else {
        // Khong co username
        patchPort(portname, layoutname, username, status, token)
          .then((res) => {
            console.log(">>> Response edit Port: ", res);
            if (res === "Edit port done") {
              handleUpdatePortFromModal({
                portname: portname,
                layoutname: layoutname,
                username: null,
                status: status,
                id: dataPortEdit.id,
              });
              toast.success("Port edited successfully!");
              handleClose();
              // window.location.reload();
            } else {
              console.error("Unexpected response:", res);
              toast.error("Error! Unexpected response");
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error! Check console for details");
          });
      }
    } else {
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
                value={username}
              >
                {userOptions.map((option) => (
                  <option key={option.id} value={option.username}>
                    {option.username}
                  </option>
                ))}
              </select>
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
