import SideNav from "components/SideNav";
import ProductGrid from "components/ProductGrid";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";



export default function Home({ catalogItems }) {
  var catalogImages = {};
  var catalogItems = catalogItems.objects.filter(( item ) => {
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
  const catalogItems = await fetch("http://localhost:3000/catalog/objects").then(res => res.json());
  
  return {
    props: {
      catalogItems : catalogItems.result
    },
  };
}
