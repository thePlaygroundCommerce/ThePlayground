import { useRouter } from "next/router";
import React from "react";
import checkout from "../api/checkout";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsFillCheckCircleFill } from "react-icons/bs";
import OrderSummary from "components/OrderSummary";
import { getOrder } from "pages/api/carts";
import { stringifyBigIntReplacer } from "util/jsonUtils";
import { getCatalogItems } from "pages/api/catalog";

// const { Client, Environment } = require("square");

// const squareClient = new Client({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
//   environment: Environment.Sandbox,
// });

// const { checkoutApi } = squareClient;

const Checkout = ({ order, objects }) => {
  console.log(objects);
  return (
    <Container>
      <Row>
        <Col xs={8}>
          <div className="w-75 mt-5">
            <div className="text-center p-3">
              <BsFillCheckCircleFill size={100} color="green" />
            </div>
            <div className="mt-5">
              <div className="text-center w-75 m-auto p-3">
                <p>
                  We thank you for your purchase. You will receive an
                  email with your order details where you can track, change your
                  order, or view your receipt.
                </p>
              </div>
              <Form.Group>
                <Form.Label>How was your shopping experience?</Form.Label>
                <div className="d-flex">
                  <div className="flex-grow-1 ">
                    <Form.Control as="textarea" placeholder="..." />
                  </div>
                  <Button variant="secondary">Send</Button>
                </div>
              </Form.Group>
            </div>
          </div>
        </Col>
        <Col>{/* <OrderSummary order={order} /> */}</Col>
      </Row>
    </Container>
  );
};

export default Checkout;

export async function getServerSideProps({ params: { orderId } }) {
  const { order } = await getOrder(orderId);
  const lineItemsCatalogIdList = order.lineItems.map(
    (item) => item.catalogObjectId
  );
  const objects = await getCatalogItems(lineItemsCatalogIdList, true);

  return {
    props: {
      order,
      objects,
    },
  };
}
