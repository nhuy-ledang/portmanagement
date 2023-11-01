// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

// export default function DeleteAdministrator(props) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const { dataAdminDelete } = props;

//   const deleteAdmin = (adminname) => {
//     return fetch(`http://homethang.duckdns.org:3000/api/admin/${adminname}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: JSON.parse(localStorage.token).token,
//       },
//     });
//   };

//   const confirmAdmin = async () => {
//     try {
//       let res = await deleteAdmin(dataAdminDelete.adminname);
//       console.log(">> check confirmAdmin:", res);
//     } catch (error) {
//       console.error("Error deleting admin:", error);
//     }
//   };

//   return (
//     <>
//       <Button variant="danger" onClick={handleShow}>
//         Delete
//       </Button>{" "}
//       <Modal show={show} onHide={handleClose} className="modal-create-admin">
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Administrator</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure? {dataAdminDelete.adminname}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={confirmAdmin}>
//             OK
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }