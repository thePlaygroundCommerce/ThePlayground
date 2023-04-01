import Link from "next/link";
import React from "react";
import { Badge, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { BsCart, BsSearch } from "react-icons/bs";

function Header() {
  return (
    <Navbar className="mb-3 px-3" bg="light" variant="light">
            <Navbar.Brand href="#home">SWaNK</Navbar.Brand>
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
            <div>
              <BsCart />
              {/* <Badge>2</Badge> */}
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
