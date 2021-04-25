/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import "./App.css";

import { Col, Container, Form, Row, Table } from "react-bootstrap";
import React, { useState } from "react";

const weatherConditions = {
  "Bone Dry": 0,
  Greasy: 9,
  Moist: 18,
  Drizzle: 27,
  "Light Rain": 36,
  Rain: 45,
  "Wet and Slippery": 54,
  "Steady Rain": 63,
  "Heavy Rain": 72,
  "Treacherous Rain and Spray": 81,
  Monsoon: 90,
  Storm: 100,
};

const elements = {
  frontWing: { label: "Front Wing", adjustment: 20 },
  rearWing: { label: "Rear Wing", adjustment: 35 },
  frontSusp: { label: "Front Suspension", adjustment: -20 },
  rearSusp: { label: "Rear Suspension", adjustment: -35 },
  frontArb: { label: "Front Anti-Roll Bar", adjustment: -18 },
  rearArb: { label: "Rear Anti-Roll Bar", adjustment: -30 },
  frontRh: { label: "Front Ride Height", adjustment: -12 },
  rearRh: { label: "Rear Ride Height", adjustment: -13 },
  frontTp: { label: "Front Tire Pressure", adjustment: 10 },
  rearTp: { label: "Rear Tire Pressure", adjustment: 12 },
  gears: { label: "Gears", adjustment: -5 },
  brakeBias: { label: "Brake Bias", adjustment: 15 },
};

const defaultValues = Object.entries(elements).reduce(
  (values, element) => ({ ...values, [element[0]]: { low: 0, high: 100 } }),
  {}
);

const SetupType = ({ element, label, lowValue, highValue, readOnly = false, handleChange }) => (
  <tr>
    <td>
      <Form.Label>{label}</Form.Label>
    </td>
    <td>
      <Form.Control
        readOnly={readOnly}
        value={lowValue}
        onChange={(event) => handleChange(element, "low", event.target.value)}
      />
    </td>
    <td>
      <Form.Control
        readOnly={readOnly}
        value={highValue}
        onChange={(event) => handleChange(element, "high", event.target.value)}
      />
    </td>
  </tr>
);

const SetupTable = ({ readOnly = false, values, handleChange = () => {} }) => (
  <Table striped bordered hover={false} size="sm">
    <thead>
      <tr>
        <th />
        <th>Lowest</th>
        <th>Highest</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(elements).map((element) => {
        const currentElement = elements[element];
        const lowValue = values[element].low;
        const highValue = values[element].high;
        return (
          <SetupType
            key={element}
            element={element}
            label={currentElement.label}
            lowValue={lowValue}
            highValue={highValue}
            readOnly={readOnly}
            handleChange={handleChange}
          />
        );
      })}
    </tbody>
  </Table>
);

const WeatherSelect = ({ value, onWeatherChange }) => (
  <Col>
    <Form.Group as={Row}>
      {/* <Form.Label>Weather: </Form.Label> */}

      <Form.Control as="select" defaultValue="Bone Dry" value={value} onChange={onWeatherChange}>
        {Object.keys(weatherConditions).map((weatherType, index) => (
          <option key={index}>{weatherType}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Col>
);

const ConvertionTypeSelect = ({ value, onConvertionChange }) => {
  const label = "Dry to Wet";

  return (
    <span>
      <Col>
        <Form.Group>
          <Form.Check label={label} value={value} onChange={onConvertionChange} />
        </Form.Group>
      </Col>
    </span>
  );
};

const App = () => {
  const [weather, setWeather] = useState("Bone Dry");
  const [convertionType, setConvertionType] = useState(true);
  const [inputValues, setInputValues] = useState(defaultValues);
  const [outputValues, setOutputValues] = useState(defaultValues);

  const calculateAdjustedValue = (_setupValue, adjustValue, weatherAdjustValue) => {
    let adjustedValue = (adjustValue / 100) * weatherAdjustValue;

    const setupValue = parseInt(_setupValue, 10);

    if (convertionType) {
      adjustedValue = Math.round(setupValue + adjustedValue);
    } else {
      adjustedValue = Math.round(setupValue - adjustedValue);
    }

    if (adjustedValue > 100) {
      adjustedValue = 100;
    } else if (adjustedValue < 0 || isNaN(adjustedValue) || adjustedValue === Infinity) {
      adjustedValue = 0;
    }
    return adjustedValue;
  };

  const handleWeatherChange = (event) => {
    const selectedWeather = event.target.value || "Bone Dry";
    setWeather(selectedWeather);
  };

  const handleConvertionTypeChange = (event) => {
    setConvertionType(!event.target.checked);

    const newOuputValues = Object.keys(inputValues).reduce((values, element) => {
      const currentValues = inputValues[element];
      const adjustValue = elements[element].adjustment;
      const currentWeather = weatherConditions[weather];
      const low = calculateAdjustedValue(currentValues.low, adjustValue, currentWeather);
      const high = calculateAdjustedValue(currentValues.high, adjustValue, currentWeather);
      const elementObject = { [element]: { low, high } };

      return { ...values, ...elementObject };
    }, {});

    setOutputValues(newOuputValues);
  };

  const handleInputValueChange = (element, type, value) => {
    let newValue = Number(value);

    if (value === "" || isNaN(value) || value < 0) {
      newValue = 0;
    } else if (value > 100) {
      newValue = 100;
    }

    setInputValues((prevState) => ({
      ...prevState,
      [element]: { ...prevState[element], [type]: newValue },
    }));

    const adjustValue = elements[element].adjustment;
    const adjustedValue = calculateAdjustedValue(newValue, adjustValue, weatherConditions[weather]);

    setOutputValues((prevState) => ({
      ...prevState,
      [element]: { ...prevState[element], [type]: adjustedValue },
    }));
  };

  return (
    <div className="App">
      <Container>
        <WeatherSelect value={weather} onWeatherChange={handleWeatherChange} />
        <ConvertionTypeSelect
          value={convertionType}
          onConvertionChange={handleConvertionTypeChange}
        />
        <Row>
          <Col>
            <SetupTable values={inputValues} handleChange={handleInputValueChange} />
          </Col>
          <Col>
            <SetupTable values={outputValues} readOnly />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
