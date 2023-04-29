import React from "react";
import { Button } from "react-bootstrap";
import CartList from "./CartList";

const CartSummary = () => {
  return (
    <>
      <div style={{ minHeight: 100, maxHeight: 200, overflowX: "hidden" }} className="p-2 border-bottom">
        <CartList />
      </div>
      <div className="w-100 mt-1">
        <div className="">
          <div className="d-flex justify-content-between">
            <p>Subtotal</p>
            <p>$30</p>
          </div>
          {/* <div className="d-flex justify-content-between">
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
          </div> */}
        </div>
      </div>
      {/* <div className="border w-100 p-2">
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
      </div> */}
      <div className="text-center d-flex">
        <Button className="w-100 mx-2" variant="dark">
          View Cart
        </Button>
        <Button className="w-100 mx-2" variant="dark">
          Checkout Now
        </Button>
      </div>
    </>
  );
};

export default CartSummary;
