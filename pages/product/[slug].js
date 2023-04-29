import React, { useContext, useState } from "react";
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
import Shirt from "public/shirt.png";
import Counter from "components/Counter";
import ReactImageMagnify from "react-image-magnify";
import BreadcrumbNav from "components/BreadcrumbNav";
import { CartContext } from "context/cartContext";
import { useRouter } from "next/router";
// import { CheckoutContext } from "context/checkoutContext";

const ProductDetails = ({ catalogObject }) => {
  const router = useRouter();
  const {
    cart: { itemVariationsIDs, order },
    createCart,
    updateCart,
  } = useContext(CartContext);
  const [activeVariationIndex, setActiveVariationIndex] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const renderProductError = () => <p>Something went wrong!</p>;
  const renderProductDetails = () => {
    const {
      object: {
        itemData,
        itemData: { variations },
      },
      relatedObjects: [image],
    } = catalogObject;
    const amount = BigInt(
      itemData.variations[0].itemVariationData.priceMoney.amount
    ).toString();
    const handleAddToCart = () => {
      const itemVariationID = variations[activeVariationIndex].id;
      const lineItem = { quantity: quantity.toString() };
      if (!isCartItemNew) {
        lineItem.uid =
          order.lineItems[itemVariationsIDs.indexOf(itemVariationID)].uid;
      } else {
        lineItem.catalogObjectId = itemVariationID;
      }

      updateCart(lineItem);
    };
    const handleBuyNow = () => {
      const itemVariationID = variations[activeVariationIndex].id;
      const lineItems = [
        {
          quantity: quantity.toString(),
          catalogObjectId: itemVariationID,
        },
      ];

      checkoutOrder({ lineItems });
    };
    const checkoutOrder = async (catalogOrder) => {
      fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(catalogOrder),
      })
        .then((res) => res.json())
        .then(({ paymentLink }) => {
          paymentLink = JSON.parse(paymentLink)
          router.push(paymentLink.url)
        })
        .catch((err) => console.error(err));
    };
    const handleDropDownButtonChange = (e) =>
      setActiveVariationIndex(e.target.name);
    const isCartItemNew = !itemVariationsIDs.includes(
      variations[activeVariationIndex].id
    );
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
      <>
        <BreadcrumbNav />

        <Row>
          <Col>
            {/* <ReactImageMagnify {...{ smallImage, largeImage }} /> */}
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
                      title={variations[
                        activeVariationIndex
                      ].itemVariationData.name[0].toUpperCase()}
                    >
                      {variations.map(({ id, itemVariationData }, i) => (
                        <Dropdown.Item
                          onClick={handleDropDownButtonChange}
                          name={i}
                          key={id}
                          href="#/action-1"
                        >
                          {itemVariationData.name[0].toUpperCase()}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                  <div className="w-75">
                    <Counter count={quantity} onCountChange={setQuantity} />
                  </div>
                </div>
              </div>
              <div className="d-grid m-3 gap-2">
                <Button variant="secondary" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button variant="dark" onClick={handleAddToCart}>
                  {isCartItemNew ? "Add To Cart" : "Update Cart"}
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Est placerat in egestas erat imperdiet sed. Neque laoreet
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Shipping & Handling</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Container>
      {catalogObject ? renderProductDetails() : renderProductError()}
    </Container>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const { Client, Environment, ApiError } = require("square");

  const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  });

  const { catalogApi } = squareClient;

  const {
    params: { slug },
  } = context;

  try {
    let catalogResponse = await catalogApi.retrieveCatalogObject(slug, true);

    return {
      props: { catalogObject: catalogResponse.result },
    };
  } catch (error) {
    return {
      props: error.result,
    };
  }
}
