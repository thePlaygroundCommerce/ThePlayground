import Image from "next/image";
import { Card } from "react-bootstrap";
import Unavailable from 'public/unavailable-image.jpeg'

export default function ProductGridItem({ itemData, images }) {
  const { name, variations } = itemData;

  return (
    <Card className="border-0 text-center w-100">
      <Card.Img
        as={Image}
        className={`mx-auto`}
        variant="top"
        width={250}
        height={250}
        src={images[0]?.url || Unavailable}
        alt={images[0]?.caption || "Picture of shirt"}
      />
      <Card.Body className="p-3">
        <Card.Text>{name}</Card.Text>
        <Card.Text>
          $ {variations[0].itemVariationData.priceMoney.amount}
        </Card.Text>
        {/* <ButtonGroup>
          <IconContext.Provider value={{ size: "1em", color: "black" }}>
            <Button variant="primary" className="text-left border-0">
              <FaCartPlus />
            </Button>
            <Button variant="primary" className="text-left border-0">
              <GoThreeBars />
            </Button>
            <Button variant="primary" className="text-left border-0">
              <FaShareAlt />
            </Button>
          </IconContext.Provider>
        </ButtonGroup> */}
      </Card.Body>
    </Card>
  );
}
