/* eslint-disable react/prop-types */
import { Col, Form, Row } from "react-bootstrap";
import React from "react";
import { weatherConditions } from "../consts";

const WeatherSelect = ({ value, onWeatherChange }) => (
  <Col>
    <Form.Group as={Row}>
      {/* <Form.Label>Weather: </Form.Label> */}

      <Form.Control as="select" defaultValue="Bone Dry" value={value} onChange={onWeatherChange}>
        {Object.keys(weatherConditions).map((weatherType) => (
          <option key={weatherType}>{weatherType}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Col>
);

export default WeatherSelect;
