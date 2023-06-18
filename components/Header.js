import { CartContext } from "context/cartContext";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Nav,
  Navbar,
  Overlay,
  Row,
} from "react-bootstrap";
import { BsPerson, BsSearch } from "react-icons/bs";
import Cart from "./Cart";
import { Person, Search } from "react-bootstrap-icons";

function Header() {
  const target = useRef();
  const { cart } = useContext(CartContext);

  return (
    <Navbar className="mb-3 px-3" bg="light" variant="light">
      <Navbar.Brand href="/">SWaNK</Navbar.Brand>
      <Container fluid>
        <Row className="w-100">
          <Col className="d-flex align-items-center">
            {/* <Nav className="ms-5">
              <Nav.Item>
                <Nav.Link as={Link} href="/blog">
                  MEN
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="/blog">
                  WOMEN
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="/blog">
                  WOMEN
                </Nav.Link>
              </Nav.Item>
            </Nav> */}
          </Col>
          <Col xs={2} className="d-flex align-items-center justify-content-end">
            {/* <div className="d-flex align-items-center">
              <div>
                <Search />
              </div>
              <div>
                <Cart cart={cart} />
              </div>
              <div>
                <Person fontSize={18} />
              </div>
            </div> */}
            <ButtonGroup>
              {/* <Button as="" variant="" className="p-1">
                <Search />
              </Button> */}
              <Button variant="" className="p-1">
                <Cart />
              </Button>
              <Button variant="" className="p-1">
                <Person fontSize={18} />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
