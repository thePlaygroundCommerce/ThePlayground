import SideNav from "components/SideNav";
import Socials from "components/Socials";
import ProductGrid from "components/ProductGrid";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { squareClient, ApiError } from "./api";
import { IconContext } from "react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { getCatalogItems } from "./api/catalog";



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
  const catalogItems = await getCatalogItems();
  return {
    props: {
      catalogItems,
    },
  };
}
