// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { AiFillEdit } from "react-icons/ai";
// import { patchPort } from "../../../services/PortService";
// import { toast } from "react-toastify";
// import {
//   getLayoutOptions,
//   getUserOptions,
// } from "../../../services/PortService";

// export default function AssignPort(props) {
//   const [portname, setPortname] = useState("");
//   const [layoutname, setLayoutname] = useState("");
//   const [username, setUsername] = useState("");
//   const [right, setRight] = useState("");
//   const [status, setStatus] = useState("");
//   const [show, setShow] = useState(false);
//   const { dataPortEdit, handleUpdatePortFromModal } = props;
//   const [layoutOptions, setLayoutOptions] = useState([]);
//   const [userOptions, setUserOptions] = useState([]);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const layoutOptionsData = await getLayoutOptions();
//         const userOptionsData = await getUserOptions();
//         setPortname(dataPortEdit.portname);
//         setLayoutOptions(layoutOptionsData);
//         setUserOptions(userOptionsData);
//         setRight(dataPortEdit.right[0]?.right);
//         setStatus(dataPortEdit.status);
//       } catch (error) {
//         console.error("Error fetching options:", error);
//       }
//     };
//     fetchOptions();
//   }, []);

//   const handleEditPort = async () => {
//     const response = await patchPort(portname, layoutname, username, right, status);
//     if (response && response.portname) {
//       handleUpdatePortFromModal({
//         portname: portname,
//         id: dataPortEdit.portid,
//         layoutname: layoutname,
//         username: username,
//         // right: right,
//         status: status,
//       });
//     }
//     toast.success("Port edited successfully!");
//     handleClose();
//     console.log(response);
//     window.location.reload();
//   };

//   return (
//     <>
//       <AiFillEdit onClick={handleShow} />
//       <Modal show={show} onHide={handleClose} className="modal-create-admin">
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Port</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <div className="mb-3">
//               <label className="form-label">Port Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={portname}
//                 disabled
//                 onChange={(e) => setPortname(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Layout Name</label>
//               <select
//                 className="form-select"
//                 value={layoutname}
//                 onChange={(e) => setLayoutname(e.target.value)}
//               >
//                 {layoutOptions.map((option) => (
//                   <option key={option.id} value={option.layoutname}>
//                     {option.layoutname}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">User Name</label>
//               <select
//                 className="form-select"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               >
//                 {userOptions.map((option) => (
//                   <option key={option.id} value={option.username}>
//                     {option.username}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Right</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={right}
//                 disabled
//                 onChange={(e) => setRight(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Status</label>
//               <select
//                 className="form-select"
//                 aria-label="Default select example"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 {status === "DOWN" ? (
//                   <>
//                     <option value="DOWN">DOWN</option>
//                     <option value="UP">UP</option>
//                   </>
//                 ) : (
//                   <>
//                     <option value="UP">UP</option>
//                     <option value="DOWN">DOWN</option>
//                   </>
//                 )}
//               </select>
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleEditPort}
//             // disabled={!isFormEditValid(email, fullname)}
//           >
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

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
  const [portname, setPortname] = useState("");
  const [layoutname, setLayoutname] = useState("");
  const [username, setUsername] = useState("");
  const [right, setRight] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const { dataPortEdit, handleUpdatePortFromModal } = props;
  const [layoutOptions, setLayoutOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [userRights, setUserRights] = useState({}); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const layoutOptionsData = await getLayoutOptions();
        const userOptionsData = await getUserOptions();
        setPortname(dataPortEdit.portname);
        setLayoutOptions(layoutOptionsData);
        setUserOptions(userOptionsData);
        if (dataPortEdit.right && dataPortEdit.right.length > 0) {
          setRight(dataPortEdit.right[0]?.right);
        }
  
        setStatus(dataPortEdit.status);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
  
    fetchOptions();
  }, [dataPortEdit]);
  
  useEffect(() => {
    if (username && userRights[username]) {
      setRight(userRights[username]);
    }
  }, [username, userRights]);

  const handleEditPort = async () => {
    const response = await patchPort(portname, layoutname, username, right, status);
    if (response && response.portname) {
      handleUpdatePortFromModal({
        portname: portname,
        id: dataPortEdit.portid,
        layoutname: layoutname,
        username: username,
        right: right, 
        status: status,
      });
    }
    toast.success("Port edited successfully!");
    handleClose();
    console.log(response);
    window.location.reload();
  };

  const handleUsernameChange = (selectedUsername) => {
    setUsername(selectedUsername);
  
    const selectedUser = userOptions.find((user) => user.username === selectedUsername);
  
    if (selectedUser && selectedUser.right && selectedUser.right.length > 0) {
      setUserRights((prevRights) => ({
        ...prevRights,
        [selectedUsername]: selectedUser.right[0].right || "", 
      }));
    } else {
      setUserRights((prevRights) => ({
        ...prevRights,
        [selectedUsername]: "", 
      }));
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
                onChange={(e) => handleUsernameChange(e.target.value)}
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
                value={right}
                disabled
                onChange={(e) => setRight(e.target.value)}
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
          <Button
            variant="primary"
            onClick={handleEditPort}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
