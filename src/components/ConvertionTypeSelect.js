/* eslint-disable react/prop-types */
import { Col, Form } from "react-bootstrap";

import React from "react";

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
export default ConvertionTypeSelect;
