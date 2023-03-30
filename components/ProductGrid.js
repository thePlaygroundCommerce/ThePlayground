import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import ProductItem from "./ProductGridItem";

const ProductGrid = ({ catalogItems, catalogImages }) => {
  const emptyProductGrid = () => <Col></Col>;

  return (
    <Container>
      <Row sm={4} className="g-5">
        {catalogItems == 0
          ? emptyProductGrid()
          : catalogItems.map((item) => {
              const { itemData } = item;
              const itemImages = itemData.imageIds;
              const images = {};

              itemImages &&
                itemImages.forEach((id) => {
                  if (catalogImages[id]) {
                    images[id] = catalogImages[id];
                  }
                });

              return (
                <Link
                  key={item.id}
                  href={`/product/${encodeURIComponent(item.id)}`}
                >
                  {console.log(item)}
                  <ProductItem itemData={item.itemData} images={Object.values(images)} />
                </Link>
              );
            })}
      </Row>
    </Container>
  );
};

export default ProductGrid;
