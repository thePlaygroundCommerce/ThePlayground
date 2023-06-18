import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import ProductItem from "./ProductGridItem";

const ProductGrid = ({ catalogItems, catalogImages }) => {
  return (
    <Container>
      {catalogItems == undefined ? (
        <EmptyProductGrid />
      ) : (
        <Row sm={4} className="g-5">
          {catalogItems?.map((item) => {
            const { itemData } = item;
            const itemImages = itemData.imageIds;
            const images = {};

            itemImages?.forEach((id) => {
              if (catalogImages[id]) {
                images[id] = catalogImages[id];
              }
            });

            return (
              <Col key={item.id}>
                <Link href={`/product/${encodeURIComponent(item.id)}`}>
                  <ProductItem
                    itemData={item.itemData}
                    images={Object.values(images)}
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

const EmptyProductGrid = () => (
  <Row>
    <Col>
      <div className="text-center w-100 my-5">
        <p>Oddly, we don't have any clothes right now.</p>
      </div>
    </Col>
  </Row>
);

export default ProductGrid;
