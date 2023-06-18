import React from "react";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group>
      <Form.Group className="text-center">
        <Button variant="" type="submit" className="w-25">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
