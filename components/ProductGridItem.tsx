import Image from "components/Image";
import Money from "./Money";
import Unavailable from "public/unavailable-image.jpeg";
import { AppProps } from "index";
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
    <div className={clsx(className, "border-0 text-center")}>
      <Image
        className={`mx-auto md:rounded-lg overflow-hidden w-full`}
          width={1080}
          height={1080}
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
