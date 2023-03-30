import React from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";

const CartSummary = () => {
  return (
    <div>
      <div className="border w-100 p-3">
        <div>
          <p>Summary</p>
        </div>
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <p>Subtotal</p>
            <p>$30</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Discounts</p>
            <p>$30</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Shipping</p>
            <p>$30</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Order Total</p>
            <p>$30</p>
          </div>
        </div>
      </div>
      <div className="border w-100 mt-5 p-3">
        <div className="">
          <InputGroup>
            <FloatingLabel label="Enter Promotional Code">
              <Form.Control
                className="border-0 border-bottom rounded-0"
                placeholder="Enter Promotional Code"
              />
            </FloatingLabel>
            <Button variant="dark">Apply</Button>
          </InputGroup>
        </div>
      </div>
      <div className="mt-3 text-center">
        <Button className="w-75" variant="dark">
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
