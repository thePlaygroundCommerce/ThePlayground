import CartSummary from "components/CartSummary";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const CartLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <p>Shopping Cart</p>
      </Row>
      <Row>
        <Col xs={8}>
          {children}
        </Col>
        <Col xs={4}>
          <CartSummary />
        </Col>
      </Row>
    </Container>
  );
};

export default CartLayout;
