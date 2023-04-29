import { CartContext } from "context/cartContext";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import {
  Badge,
  Col,
  Container,
  Nav,
  Navbar,
  Overlay,
  Row,
} from "react-bootstrap";
import { BsCart, BsSearch } from "react-icons/bs";
import Cart from "./Cart";

function Header() {
  const target = useRef();
  const { cart } = useContext(CartContext);

  return (
    <Navbar className="mb-3 px-3" bg="light" variant="light">
      <Navbar.Brand href="/">SWaNK</Navbar.Brand>
      <Container fluid>
        <Row className="w-100">
          <Col>
            <Nav>
              <Nav.Item as={Link} href="/blog">
                MEN
              </Nav.Item>
              <Nav.Item as={Link} href="/blog">
                WOMEN
              </Nav.Item>
              <Nav.Item as={Link} href="/blog">
                WOMEN
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={2} className="d-flex align-items-center justify-content-end">
            <div className="mx-2">
              <BsSearch />
            </div>
            <Cart cart={cart}/>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
