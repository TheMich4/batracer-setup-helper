import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { addRace } from "../redux/SetupHistory/setupHistory.actions";

const AddRaceModal = (props) => {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    if (country !== "") {
      props.addRace(country);
    }

    handleClose();
  };

  const handleCountryChange = (event) => setCountry(event.target.value);

  const renderForm = () => (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Country:
        </Form.Label>
        <Col sm={10}>
          <Form.Control required onChange={handleCountryChange} />
        </Col>
      </Form.Group>
    </Form>
  );

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        + Add New Race
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Race</Modal.Title>
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

const mapDispatchToProps = (dispatch) => ({
  addRace: (country) => dispatch(addRace(country)),
});

export default connect(null, mapDispatchToProps)(AddRaceModal);
