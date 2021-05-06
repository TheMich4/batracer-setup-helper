import React, { useState } from "react";
import { connect } from "react-redux";
import { Navbar as ReactNavbar, ButtonGroup, Modal, Button, FormControl } from "react-bootstrap";
import AddRaceModal from "./AddRaceModal";
import WeatherSetupConverter from "./WeatherSetupConverter";
import { getRaceList } from "../redux/SetupHistory/setupHistory.actions";

const WetWeatherModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Wet Weather Calculator
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wet Weather Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WeatherSetupConverter />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

const RaceSelect = ({ races = [] }) => (
  <FormControl as="select" className="mr-sm-2" style={{ maxWidth: "200px" }}>
    {races.map((race) => (
      <option key={race} value={race}>
        {race}
      </option>
    ))}
  </FormControl>
);

const Navbar = ({ races }) => (
  <ReactNavbar collapseOnSelect bg="dark" expand="lg" variant="dark">
    <ReactNavbar.Brand>Batracer Setup Helper</ReactNavbar.Brand>
    {races.length > 0 && <RaceSelect races={races} />}
    <ReactNavbar.Toggle />
    <ReactNavbar.Collapse className="justify-content-end">
      <ButtonGroup>
        <AddRaceModal />
        <WetWeatherModal />
      </ButtonGroup>
    </ReactNavbar.Collapse>
  </ReactNavbar>
);

const mapStateToProps = (state) => ({
  races: getRaceList(state),
});

export default connect(mapStateToProps)(Navbar);
