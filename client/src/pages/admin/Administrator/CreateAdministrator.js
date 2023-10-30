import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from 'react-toastify';

export default function CreateAdministrator() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postCreateAdmin = (name, job) => {
    return axios.post("https://reqres.in/api/users", {name, job})
}

  const handleSaveAdmin = async () => {
    let res = await postCreateAdmin(name, job);
    console.log(res)
    if (res && res.data.id) {
      handleClose();
      setName('');
      setJob('');
      toast.success("A admin is created succeed!");
    } else {
      //error
      toast.success("Error!");
    }
  }
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Edit Administrator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Administrator</Form.Label>
              <Form.Control
                type="text"
                placeholder="Administrator"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="email"
                placeholder="Password"
                autoFocus
              />
            </Form.Group> */}
            <form onSubmit={handleSaveAdmin}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label class="form-label">Job</label>
                <input
                  type="text"
                  className="form-control"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
            </form>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAdmin}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
