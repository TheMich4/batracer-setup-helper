/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";
import React from "react";

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

export default SetupType;
