import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import parseSetup from "./parseSetup";

const SettingsModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   const [isValid, setValid] = useState(true);

  const [setup, setSetup] = useState("");

  const handleSetupChange = (event) => {
    const text = event.target.value || "";
    setSetup(text);
  };

  const handleSubmit = () => {
    console.log("SUBMIT");
    const parsedSetup = parseSetup(setup);
    console.log({ parsedSetup });

    if (parsedSetup === false) {
      //   setValid(false);
    } else {
      //   setValid(true);
    }
  };

  const renderForm = () => (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Country:
        </Form.Label>
        <Col sm={10}>
          <Form.Control disabled required onChange={() => {}} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Import setup:
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="textarea" rows="10" onChange={handleSetupChange} value={setup} />
        </Col>
      </Form.Group>
    </Form>
  );

  return (
    <>
      <Button style={{ display: "flex" }} onClick={handleShow}>
        SETTINGS
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsModal;
