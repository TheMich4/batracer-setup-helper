import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ConvertionTypeSelect from "./ConvertionTypeSelect";
import SetupTable from "./SetupTable";
import WeatherSelect from "./WeatherSelect";
import { defaultValues, elements, weatherConditions } from "../consts";

const WeatherSetupConverter = () => {
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
    } else if (adjustedValue < 0 || Number.isNaN(adjustedValue) || adjustedValue === Infinity) {
      adjustedValue = 0;
    }
    return adjustedValue;
  };

  const calculateOutputValues = () =>
    Object.keys(inputValues).reduce((values, element) => {
      const currentValues = inputValues[element];
      const adjustValue = elements[element].adjustment;
      const currentWeather = weatherConditions[weather];
      const low = calculateAdjustedValue(currentValues.low, adjustValue, currentWeather);
      const high = calculateAdjustedValue(currentValues.high, adjustValue, currentWeather);
      const elementObject = { [element]: { low, high } };

      return { ...values, ...elementObject };
    }, {});

  const handleWeatherChange = (event) => {
    const selectedWeather = event.target.value || "Bone Dry";
    setWeather(selectedWeather);

    const newOuputValues = calculateOutputValues();
    setOutputValues(newOuputValues);
  };

  const handleConvertionTypeChange = (event) => {
    setConvertionType(!event.target.checked);

    const newOuputValues = calculateOutputValues();
    setOutputValues(newOuputValues);
  };

  const handleInputValueChange = (element, type, value) => {
    let newValue = Number(value);

    if (value === "" || Number.isNaN(value) || value < 0) {
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
  );
};

export default WeatherSetupConverter;
