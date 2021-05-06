import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import SetupPart from "./SetupPart";
import SettingsModal from "./SettingsModal";

const RaceCard = ({ race, setup }) => (
  <Card className="text-center" style={{ margin: "10px" }}>
    <Card.Header as="h5" style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flexGrow: "1" }} />
      {race.country}
      <div style={{ flexGrow: "1" }} />
      <SettingsModal />
    </Card.Header>
    <Card.Body>
      {/* <Card.Title>TITLE</Card.Title>
      <Card.Text>TEXT</Card.Text> */}
      {Object.keys(setup).map((setupPart) => (
        <SetupPart name={setupPart} setupPart={setup[setupPart]} />
      ))}
    </Card.Body>
  </Card>
);

const mapStateToProps = () => ({
  race: { id: "ID", country: "COUNTRY" },
  setup: {
    wings: { front: {}, rear: {} },
    suspension: { front: {}, rear: {} },
    arb: { front: {}, rear: {} },
    rideHeight: { front: {}, rear: {} },
    tyrePressure: { front: {}, rear: {} },
    gears: { gears: {} },
    brakeBias: { brakeBias: {} },
  },
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RaceCard);
