import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import SetupPart from "./SetupPart";
import SettingsModal from "./SettingsModal";
import {
  getActiveRace,
  addSetup,
  getActiveSetup,
  setActiveSetup,
} from "../../redux/SetupHistory/setupHistory.actions";
import Select from "react-select";

const RaceCard = ({
  race,
  setup = null,
  lastRaceId,
  addSetup,
  activeSetupName,
  selectedOption,
  setActiveSetup,
  state,
}) => {
  console.log({ race, setup });
  console.log("x", state.setupHistory);

  const setupOptions = Object.keys(race.setups).map((o) => ({ value: o, label: o }));

  const handleActiveSetupChange = (selectedOption) => {
    console.log({ selectedOption });
    setActiveSetup(selectedOption.value);
  };

  if (lastRaceId < 0) {
    return <div />;
  }

  return (
    <Card className="text-center" style={{ margin: "10px" }}>
      <Card.Header as="h5" style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: "1" }} />
        {race.country}
        <div style={{ flexGrow: "1" }} />
        <div style={{ width: "200px", marginRight: "10px" }}>
          <Select
            options={setupOptions}
            value={{ value: activeSetupName, label: activeSetupName }}
            onChange={handleActiveSetupChange}
          />
        </div>
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
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  addSetup: (setupName, setup) => dispatch(addSetup(setupName, setup)),
  setActiveSetup: (setupName) => dispatch(setActiveSetup(setupName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RaceCard);
