import Image from "next/image";
import Money from "./Money";
import Unavailable from "public/unavailable-image.jpeg";
import { AppProps } from "types";
import { CatalogItem, CatalogObject } from "square";
import clsx from "clsx";

type Props = {
  itemData: CatalogItem
  images: CatalogObject[]
} & AppProps

export default function ProductGridItem({ itemData, images, className }: Props) {
  let { imageIds } = itemData;
  const { name, variations } = itemData;
  if(!imageIds) imageIds = []

  const displayImage = images.find(image => image.id === imageIds[0])?.imageData;

  return (
    <div className={clsx(className, "border-0 text-center ")}>
      <Image
        className={`mx-auto`}
          width={250}
          height={250}
        src={displayImage?.url || Unavailable}
        alt={displayImage?.caption || "Picture of shirt"}
      />
      <div className="p-3">
        <div>{name}</div>
        <div>
          <Money number={variations![0].itemVariationData?.priceMoney?.amount ?? 0} />
        </div>
      </div>
    </div>
  );
}
