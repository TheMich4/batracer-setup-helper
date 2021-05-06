import React, { useState } from "react";
import { connect } from "react-redux";
import { Navbar as ReactNavbar, ButtonGroup, Modal, Button, FormControl } from "react-bootstrap";
import AddRaceModal from "./AddRaceModal";
import WeatherSetupConverter from "./WeatherSetupConverter";
import { getRaceList, setActiveRace } from "../redux/SetupHistory/setupHistory.actions";
import Select from "react-select";

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

const RaceSelect = ({ races = [], handleRaceChange, activeRaceId }) => {
  const o = { value: races[activeRaceId].country, label: races[activeRaceId].country };

  return (
    <div style={{ width: "200px" }}>
      {console.log({ races, activeRaceId })}
      <Select
        options={races.map((race) => ({ value: race.id, label: race.country }))}
        value={o}
        defaultValue={o}
        onChange={handleRaceChange}
      />
    </div>
  );
};

const Navbar = ({ races, setActiveRace, activeRaceId }) => {
  const handleRaceChange = (selectedOption) => {
    setActiveRace(selectedOption.value);
  };

  return (
    <ReactNavbar collapseOnSelect bg="dark" expand="lg" variant="dark">
      <ReactNavbar.Brand>Batracer Setup Helper</ReactNavbar.Brand>
      {races.length > 1 && (
        <RaceSelect races={races} activeRaceId={activeRaceId} handleRaceChange={handleRaceChange} />
      )}
      <ReactNavbar.Toggle />
      <ReactNavbar.Collapse className="justify-content-end">
        <ButtonGroup>
          <AddRaceModal />
          <WetWeatherModal />
        </ButtonGroup>
      </ReactNavbar.Collapse>
    </ReactNavbar>
  );
};

const mapStateToProps = (state) => ({
  races: getRaceList(state),
  activeRaceId: state.setupHistory.activeRaceId,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveRace: (raceId) => dispatch(setActiveRace(raceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
