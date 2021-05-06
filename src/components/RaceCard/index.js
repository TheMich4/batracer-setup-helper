import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import SetupPart from "./SetupPart";
import SettingsModal from "./SettingsModal";

const RaceCard = ({ race, setup, lastRaceId }) => {
  if (lastRaceId < 0) {
    return <div />;
  }

  return (
    <Card className="text-center" style={{ margin: "10px" }}>
      <Card.Header as="h5" style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: "1" }} />
        {race.country}
        <div style={{ flexGrow: "1" }} />
        <SettingsModal />
      </Card.Header>
      <Card.Body>
        {Object.keys(setup).map((setupPart) => (
          <SetupPart name={setupPart} setupPart={setup[setupPart]} />
        ))}
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  lastRaceId: state.setupHistory.lastRaceId,
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
