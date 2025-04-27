import Image from "components/Image";
import Money from "./Money";
import Unavailable from "public/unavailable-image.jpeg";
import { AppProps } from "index";
import { CatalogItem, CatalogObject } from "square";
import clsx from "clsx";
import Heading from "./typography/Heading";
import Link from "next/link";
// import StarRating from "./StarRating";
import Button from "./Button";

type OmitType<T> = Omit<T, "type">
type OmmitedTypeProps = Omit<Props, 'type'>

type Props = {
  type: keyof ProductGridItemMap
  itemData: CatalogItem
  images: CatalogObject[]
} & AppProps

export default function ProductGridItem({ type, ...props }: Props) {
  const GridItemComponent = gridItemMap[type]
  if (!GridItemComponent) return false;

  return <GridItemComponent {...props} />
}

const RetailGridItem = ({ itemData, images, className }: OmitType<Props>) => {

  let { imageIds } = itemData;
  const { name, variations } = itemData;
  if (!imageIds) imageIds = []

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

const TripEventGridItem = ({ itemData, images, className }: OmitType<Props>) => {
  return (
    <div className="p-4">
      <div className="flex flex-col w-full rounded overflow-hidden">
        <div className="flex-1 max-w-full"><Image className=" w-full object-cover" alt={""} width={1080} height={1080} /></div>
        <div className="flex-4 bg-white">
          <div className="p-8 relative flex items-center h-full w-full">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Heading level={2}>Benidorm, Spain</Heading>
                <Money number={30000} />
              </div>
              {/* <div className="flex gap-2">
                <StarRating fill={3} /> <p>Customer Reviews</p>
              </div> */}
              <div>
                Benidorm is a buzzing resort with a big reputation for beach holidays.
                Situated in sunny Costa Blanca, the town is one of the original
                Spanish beach resorts in spain.
              </div>
              <Link href={`/trips/trip/${1}`}>
                <Button variant="primary" className="w-fit">
                  View Trip
                </Button>
              </Link>
            </div>
            {/* <div className="absolute -top-1 -right-1 size-12 bg-teal-500"></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export type ProductGridItemMap = {
  shop: React.FC<OmmitedTypeProps>
  trips: React.FC<OmmitedTypeProps>
}
const gridItemMap: ProductGridItemMap = {
  shop: RetailGridItem,
  trips: TripEventGridItem
}