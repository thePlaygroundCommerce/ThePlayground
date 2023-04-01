import React from "react";
import { useRouter } from "next/router";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import Image from "next/image";
import Shirt from "public/shirt.png";
import border from "public/border.png";
import Counter from "components/Counter";
import ReactImageMagnify from "react-image-magnify";
import BreadcrumbNav from "components/BreadcrumbNav";
import Link from "next/link";

const { Client, Environment, ApiError } = require("square");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { catalogApi } = squareClient;

const ProductDetails = ({ catalogObjects }) => {
  const {
    object: { itemData },
    relatedObjects: [image],
  } = catalogObjects;
  const amount = BigInt(
    itemData.variations[0].itemVariationData.priceMoney.amount
  ).toString();

  const smallImage = {
    alt: "picture of shirt",
    src: image.imageData.url,
    width: Shirt.width,
    height: Shirt.height,
    isFluidWidth: false,
  };

  const largeImage = {
    alt: "picture of shirt",
    src: image.imageData.url,
    width: Shirt.width * 2,
    height: Shirt.height * 2,
    // isFluidWidth: true
  };

  return (
    <Container>
      <BreadcrumbNav />

      <Row>
        <Col>
          <ReactImageMagnify {...{ smallImage, largeImage }} />
        </Col>
        <Col>
          <div className="w-75 m-auto">
            <div className="mt-5 m-3 p-3">
              <div>
                <div className="text-center mb-5">
                  <p className="h4">SWaNK</p>
                  <p className="h4 fw-bold">{itemData.name}</p>
                </div>
                <p>$ {amount}</p>
              </div>
              <div className="d-flex">
                <div className="w-75">
                  <DropdownButton
                    variant="secondary"
                    id="dropdown-basic-button"
                    title="M"
                  >
                    <Dropdown.Item href="#/action-1">S</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">M</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">L</Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="w-75">
                  <Counter />
                </div>
              </div>
            </div>
            <div className="d-grid m-3 gap-2">
              <Button variant="secondary">
                Buy Now
              </Button>
              <Button variant="dark">
                Add To Cart
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header>Description</Card.Header>
            <Card.Body>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Est
                placerat in egestas erat imperdiet sed. Neque laoreet
                suspendisse interdum consectetur.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Sizing</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Shipping & Handling</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;

  var catalogObjects = await (async () => {
    try {
      let catalogResponse = await catalogApi.retrieveCatalogObject(slug, true);
      let parsedObject = catalogResponse.result;

      console.log(parsedObject);

      return parsedObject;
    } catch (error) {
      if (error instanceof ApiError) {
        error.result.errors.forEach(function (e) {
          console.log(e.category);
          console.log(e.code);
          console.log(e.detail);
        });
      } else {
        console.log("Unexpected error occurred: ", error);
      }
    }
  })();

  return {
    props: { catalogObjects },
  };
}
