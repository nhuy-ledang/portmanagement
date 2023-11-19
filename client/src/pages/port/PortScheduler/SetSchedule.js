import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { IoMdCreate } from "react-icons/io";
import {
  postPortScheduler,
  getLayoutOptions,
} from "../../../services/PortSchedulerSevice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SetSchedule(props) {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [layoutnames, setLayoutnames] = useState([]);
  const [portnames, setPortnames] = useState([]);
  const [layoutname, setLayoutname] = useState("");
  const [portname, setPortname] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { handleUpdateTable } = props;

  const handleClose = () => {
    setShow(false);
    setSelectedDateTime(new Date());
    setLayoutname("");
    setPortname("");
    setStatus("");
  };

  const handleShow = () => setShow(true);

  const handleCreateScheduler = async () => {
    const formattedDateTime = {
      year: selectedDateTime.getFullYear(),
      month: selectedDateTime.getMonth() + 1,
      day: selectedDateTime.getDate(),
      hours: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
    };

    const requestData = {
      ...formattedDateTime,
      portname,
      status,
    };

    console.log(">>Check requestData: ", requestData);

    try {
      const res = await postPortScheduler(requestData);
      console.log(res);
      if (res === "Add scheduler succeed") {
        handleClose();
        toast.success("Scheduler created successfully!");
        await handleUpdateTable(requestData);
        window.location.reload();
      } else {
        toast.error("Error!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLayoutnameChange = async (e) => {
    const selectedLayoutname = e.target.value;
    setLayoutname(selectedLayoutname);

    try {
      const options = await getLayoutOptions();
      const selectedLayout = options.find(
        (option) => option.layoutname === selectedLayoutname
      );
      if (selectedLayout) {
        setPortnames(selectedLayout.portnames);
        setPortname("");
      } else {
        setPortnames([]);
        setPortname("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePortnameChange = (e) => {
    setPortname(e.target.value);
  };

  useEffect(() => {
    const fetchLayoutnames = async () => {
      try {
        const options = await getLayoutOptions();
        const layoutnames = options.map((option) => option.layoutname);
        setLayoutnames(layoutnames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLayoutnames();
  }, []);

  

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <IoMdCreate />
      </Button>
      <Modal show={show} onHide={handleClose} className="modal-create-admin">
        <Modal.Header closeButton>
          <Modal.Title>Set Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Date Time</label>
              <div>
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Layout Name</label>
              {layoutnames.length > 0 && (
                <select
                  className="form-control"
                  value={layoutname}
                  onChange={handleLayoutnameChange}
                >
                  <option value="">Select layout</option>
                  {layoutnames.map((layoutname) => (
                    <option key={layoutname} value={layoutname}>
                      {layoutname}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Port Name</label>
              {portnames.length > 0 ? ( // Check if portnames is not empty or undefined
                <select
                  className="form-control"
                  value={portname}
                  onChange={handlePortnameChange}
                >
                  <option value="">Select port</option>
                  {portnames.map((portname) => (
                    <option key={portname} value={portname}>
                      {portname}
                    </option>
                  ))}
                </select>
              ) : (
                <select className="form-control" disabled>
                  <option value="">No ports available</option>
                </select>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="UP">UP</option>
                <option value="DOWN">DOWN</option>
              </select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCreateScheduler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
