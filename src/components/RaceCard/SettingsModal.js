import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import parseSetup from "./parseSetup";

const SettingsModal = ({ country = "", addSetup }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   const [isValid, setValid] = useState(true);

  const [setupName, setSetupName] = useState("");
  const [setup, setSetup] = useState("");

  const handleSetupChange = (event) => {
    const text = event.target.value || "";
    setSetup(text);
  };

  const handleSetupNameChange = (event) => {
    const text = event.target.value || "";
    setSetupName(text);
  };

  const handleSubmit = () => {
    if (setupName === "") {
      return;
    }

    if (setup === "") {
      addSetup(setupName);
    } else {
      const parsedSetup = parseSetup(setup);

      if (parsedSetup === false) {
        //   setValid(false);
      } else {
        //   setValid(true);

        // TODO REFACTOR THIS !!!
        const setup = {
          wings: { front: parsedSetup[0], rear: parsedSetup[1] },
          suspension: { front: parsedSetup[2], rear: parsedSetup[3] },
          arb: { front: parsedSetup[4], rear: parsedSetup[5] },
          rideHeight: { front: parsedSetup[6], rear: parsedSetup[7] },
          tyrePressure: { front: parsedSetup[8], rear: parsedSetup[9] },
          gears: { gears: parsedSetup[10] },
          brakeBias: { brakeBias: parsedSetup[11] },
        };

        addSetup(setupName, setup);
      }
    }

    setSetup("");
    setSetupName("");
    handleClose();
  };

  const renderForm = () => (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Country:
        </Form.Label>
        <Col sm={10}>
          <Form.Control disabled required onChange={() => {}} value={country} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Setup name:
        </Form.Label>
        <Col sm={10}>
          <Form.Control required onChange={handleSetupNameChange} value={setupName} />
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
        ADD SETUP
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
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
