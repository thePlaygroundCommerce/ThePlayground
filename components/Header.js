import Link from "next/link";
import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

function Header() {
  return (
    <Navbar className="mb-3 p-0" bg="light" variant="light">
      <Container fluid>
        <Row className="p-0 m-0">
          <Col>
            <Nav>
              <Nav.Item as={Link} href="/blog">
                BLOG
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
