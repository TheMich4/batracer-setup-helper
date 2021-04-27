/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from "react";
import { Table } from "react-bootstrap";
import SetupType from "./SetupType";
import { elements } from "../consts";

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

export default SetupTable;
