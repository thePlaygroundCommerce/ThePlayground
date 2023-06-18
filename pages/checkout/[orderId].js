import { useRouter } from "next/router";
import React from "react";
import checkout from "../api/checkout";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsFillCheckCircleFill } from "react-icons/bs";
import OrderSummary from "components/OrderSummary";
import { getOrder } from "pages/api/carts";
import { getCatalogItems } from "pages/api/catalog";
import OrderList from "components/OrderList";
import Link from "next/link";

const Checkout = ({ order, objects }) => {
  console.log(objects);
  return (
    <Container fluid>
      <Row>
        <Col xs={7}>
          <OrderList orders={order.lineItems} />
        </Col>
        <Col xs={5}>
          <div className="w-75 mt-5">
            <div className="text-center p-3">
              <BsFillCheckCircleFill size={100} color="green" />
            </div>
            <div className="mt-5">
              <div className="text-center m-auto p-3">
                <p>
                  We thank you for your purchase. You will receive an email with
                  your order details shortly.
                </p>
                <p>
                  Log in to your aaccount and keep track of or change your
                  order.
                </p>
                <Button as={Link} href="/login" variant="link">
                  Login
                </Button>
                <Button as={Link} href="/login" variant="link">
                  View Order
                </Button>
                <Button as={Link} href="/" variant="link">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="w-75 mt-5">
            <div className="mt-5">
              <div className="text-center m-auto p-3">
                <p>
                  Log in to your aaccount and keep track of or change your
                  order.
                </p>
                <Button as={Link} href="/login" variant="link">
                  Login
                </Button>
                <Button as={Link} href="/login" variant="link">
                  View Order
                </Button>
                <Button as={Link} href="/" variant="link">
                  Continue Shopping
                </Button>
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
          </div> */}
        </Col>
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
