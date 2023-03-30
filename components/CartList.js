import React from "react";
import { ListGroup } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const CartList = ({ cartItems = [1, 2, 3, 4, 5] }) => {
  return (
    <ListGroup variant="flush">
      {cartItems.map((item, i) => (
        <ListGroup.Item key={item} className="d-flex row m-3 p-3">
          <div className="col-2">
            <div
              className="w-100 bg-secondary"
              style={{ height: 130.33 }}
            ></div>
          </div>
          <div className="col-6 d-flex align-items-center">
            <p>Shirt</p>
          </div>
          <div className="col-1  d-flex align-items-center">
            <p>2</p>
          </div>
          <div className="col-2  d-flex align-items-center">
            <p>$92.00</p>
          </div>
          <div className="col-1  d-flex align-items-center justify-content-end">
            <IoClose />
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CartList;
