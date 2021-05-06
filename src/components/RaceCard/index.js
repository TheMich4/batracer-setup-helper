import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import SetupPart from "./SetupPart";
import SettingsModal from "./SettingsModal";
import {
  getActiveRace,
  addSetup,
  getActiveSetup,
} from "../../redux/SetupHistory/setupHistory.actions";

const RaceCard = ({ race, setup = null, lastRaceId, addSetup, activeSetupName }) => {
  console.log({ race, setup });
  if (lastRaceId < 0) {
    return <div />;
  }

  return (
    <Card className="text-center" style={{ margin: "10px" }}>
      <Card.Header as="h5" style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: "1" }} />
        {race.country}
        <div style={{ flexGrow: "1" }} />
        <SettingsModal addSetup={addSetup} country={race.country} />
      </Card.Header>
      {activeSetupName && setup && (
        <Card.Body>
          {Object.keys(setup).map((setupPart) => (
            <SetupPart name={setupPart} setupPart={setup[setupPart]} />
          ))}
        </Card.Body>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  lastRaceId: state.setupHistory.lastRaceId,
  race: getActiveRace(state),
  setup: getActiveSetup(state),
  activeSetupName: state.setupHistory.activeSetupName,
});

const mapDispatchToProps = (dispatch) => ({
  addSetup: (setup) => dispatch(addSetup(setup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RaceCard);
