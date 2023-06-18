import Link from "next/link";
import React from "react";
import { Accordion, Button, Nav } from "react-bootstrap";
import { CaretDownFill } from "react-bootstrap-icons";

function SideNav(props) {
  const categoryObjs = [""];

  return (
    <Accordion className="w-100 border border-0" flush>
      <Accordion.Item className="border border-0" eventKey="1">
        <Accordion.Header  className="border border-0">CLOTHING</Accordion.Header>
        <Accordion.Body className="p-0 border border-0">
          <Accordion>
            <Accordion.Item className="border border-0">
              <Accordion.Body>
                <Button
                  as={Accordion.Item}
                  variant=""
                  className="border-0 rounded-1 my-0 py-0 text-end"
                >
                  SHIRTS
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="border border-0">
              <Accordion.Body>
                <Button
                  as={Accordion.Item}
                  variant=""
                  className="border-0 rounded-1 my-0 py-0 text-end"
                >
                  JACKETS
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="border border-0">
              <Accordion.Body>
                <Button
                  as={Accordion.Item}
                  variant=""
                  className="border-0 rounded-1 my-0 py-0 text-end"
                >
                  SWEATERS
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="border-0" eventKey="2">
        <Accordion.Header className="mb-1 me-1">ACCESSORIES</Accordion.Header>
      </Accordion.Item>
      <Accordion.Item className="border-0" eventKey="3">
        <Accordion.Header className="mb-1 me-1">FOOTWEAR</Accordion.Header>
      </Accordion.Item>
      <Accordion.Item className="border-0" eventKey="4">
        <Accordion.Header className="mb-1 me-1">LIFE</Accordion.Header>
      </Accordion.Item>
    </Accordion>
  );
}

export default SideNav;
