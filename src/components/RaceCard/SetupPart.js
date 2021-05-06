import React from "react";
import {
  Card,
  // Dropdown,
  // DropdownButton,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
} from "react-bootstrap";
import { get } from "lodash";

const SetupPart = ({ name, setupPart }) => (
  <Card className="text-center">
    <Card.Header>{name}</Card.Header>
    <Card.Body>
      <Container>
        {Object.keys(setupPart).map((x) => (
          <Form as={Row} style={{ marginBottom: "5px" }}>
            <Col>
              <Form.Label>{x}</Form.Label>
            </Col>
            {["low", "high"].map((element) => (
              <Col>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>{element}</InputGroup.Text>
                  </InputGroup.Prepend>
                  {console.log({ setupPart })}
                  <Form.Control value={get(setupPart, `${x.toLowerCase()}.${element}`, "test")} />
                </InputGroup>
              </Col>
            ))}
            {/* <Col sm={2}>
              <DropdownButton variant="outline-secondary" title="Used values">
                <Dropdown.Item href="#">Action</Dropdown.Item>
              </DropdownButton>
            </Col> */}
          </Form>
        ))}
      </Container>
    </Card.Body>
  </Card>
);

export default SetupPart;
