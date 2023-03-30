import SideNav from "components/SideNav";
import Socials from "components/Socials";
import ProductGrid from "components/ProductGrid";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaShoppingCart } from "react-icons/fa";

const { Client, Environment, ApiError } = require("square");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { catalogApi } = squareClient;

export default function Home({ catalogItems }) {
  var catalogImages = {};
  var catalogItems = catalogItems.filter(( item ) => {
    if(item.type === 'ITEM'){
      return true;
    } else if(item.type === 'IMAGE'){
      catalogImages[item.id] = item.imageData
    }
  })

  return (
    <Container className="p-0" fluid>
      <Row className="p-4 pb-0">
        <Col sm={2}>
          <SideNav />
        </Col>
        <Col>
          <ProductGrid catalogItems={catalogItems} catalogImages={catalogImages} />
        </Col>
      </Row>
    </Container>
  );
}

export async function getServerSideProps() {
  const catalogItems = await (async () => {
    try {
      let catalogResponse = await catalogApi.listCatalog(
        undefined,
        "IMAGE,ITEM"
      );
      let parsedObjects = catalogResponse.result.objects;

      return parsedObjects;
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
    props: {
      catalogItems,
    },
  };
}
