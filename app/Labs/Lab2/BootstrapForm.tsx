"use client";

import { FormSelect } from "react-bootstrap";
import { FormCheck } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import InputGroup from "react-bootstrap/esm/InputGroupText";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FormControl } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-dropdowns" className="p-4">
      {/* Dropdowns */}
      <h3>Dropdowns</h3>
      <FormSelect aria-label="Example select menu" className="mb-3">
        <option value="0" defaultChecked>
          Open this select menu
        </option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </FormSelect>

      {/* Switches */}
      <div id="wd-css-styling-switches">
        <h3>Switches</h3>
        <FormCheck
          type="switch"
          id="switch1"
          label="Unchecked switch checkbox input"
          defaultChecked={false}
        />
        <FormCheck
          type="switch"
          id="switch2"
          label="Checked switch checkbox input"
          defaultChecked
        />
        <FormCheck
          type="switch"
          id="switch3"
          label="Unchecked disabled switch checkbox input"
          disabled
        />
        <FormCheck
          type="switch"
          id="switch4"
          label="Checked disabled switch checkbox input"
          defaultChecked
          disabled
        />
      </div>

      {/* Range / Slider */}
      <div id="wd-css-styling-range-and-sliders" className="mt-3">
        <h3>Range</h3>
        <FormLabel>Example range</FormLabel>
        <FormRange min="0" max="5" step="0.5" />
      </div>

      {/* Input Addons */}
      <div id="wd-css-styling-addons" className="mt-4">
        <h3>Addons</h3>
        <InputGroup className="mb-3">
          <InputGroupText>$</InputGroupText>
          <FormControl placeholder="Amount" />
          <InputGroupText>.00</InputGroupText>
        </InputGroup>

        <InputGroup>
          <FormControl placeholder="Amount" />
          <InputGroupText>$</InputGroupText>
          <InputGroupText>0.00</InputGroupText>
        </InputGroup>
      </div>

      {/* Responsive Form */}
      <div id="wd-css-responsive-forms-1" className="mt-4">
        <h3>Responsive forms</h3>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="email1">
            <FormLabel column sm={2}>
              Email
            </FormLabel>
            <Col sm={10}>
              <FormControl type="email" defaultValue="email@example.com" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="password1">
            <FormLabel column sm={2}>
              Password
            </FormLabel>
            <Col sm={10}>
              <FormControl type="password" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="textarea2">
            <FormLabel column sm={2}>
              Bio
            </FormLabel>
            <Col sm={10}>
              <FormControl as="textarea" style={{ height: "100px" }} />
            </Col>
          </Form.Group>
        </Form>
      </div>

<div id="wd-css-responsive-forms-2">
   <h3>Responsive forms 2</h3>
   <Form>
      <Row className="mb-3" controlid="formHorizontalEmail">
         <FormLabel column sm={2}> Email </FormLabel>
         <Col sm={10}> <FormControl type="email" placeholder="Email" /> </Col>
      </Row>
      <Row className="mb-3" controlid="formHorizontalPassword">
         <FormLabel column sm={2}> Password </FormLabel>
         <Col sm={10}> <FormControl type="password" placeholder="Password" /> </Col>
      </Row>
      <fieldset>
         <Row className="mb-3">
            <FormLabel as="legend" column sm={2}> Radios </FormLabel>
            <Col sm={10}>
               <FormCheck type="radio" label="First radio" name="formHorizontalRadios" defaultChecked />
               <FormCheck type="radio" label="Second radio" name="formHorizontalRadios" />
               <FormCheck type="radio" label="Third radio" name="formHorizontalRadios" />
               <FormCheck type="radio" label="Remember me" name="formHorizontalRadios" />
            </Col>
         </Row>
      </fieldset>
      <Col> <Button type="submit">Sign in</Button> </Col>
   </Form>
</div>

      
    </div>
  );
}
