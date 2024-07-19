import Image from "next/image";
import Money from "./Money";
import Unavailable from "public/unavailable-image.jpeg";

export default function ProductGridItem({ itemData, images }) {
  const { name, variations } = itemData;
  const firstImage = images[0]?.imageData;

  return (
    <div className="border-0 text-center ">
      <Image
        className={`mx-auto`}
        variant="top"
        width={250}
        height={250}
        src={firstImage.url || Unavailable}
        alt={firstImage.caption || "Picture of shirt"}
      />
      <div className="p-3">
        <div>{name}</div>
        <div>
          <Money number={variations[0].itemVariationData.priceMoney.amount} />
        </div>
      </div>
    </div>
  );
}
