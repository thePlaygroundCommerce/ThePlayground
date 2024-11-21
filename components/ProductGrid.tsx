import Link from "next/link";
import ProductItem from "./ProductGridItem";
import { AppProps } from "types";
import { CatalogObject } from "square";
import ShopNavigation from "./ShopNavigation";
import Button from "./Button";

type Props = {
  catalogItems: CatalogObject[];
  catalogImages: CatalogObject[];
} & AppProps;

const ProductGrid = ({ catalogItems, catalogImages }: Props) => {
  return (
    <div className="flex flex-wrap max-w-full gap-y-16">
      {!catalogItems ? (
        <EmptyProductGrid />
      ) : (
        catalogItems?.map(({ itemData = {}, id }) => {
          const itemImages = itemData?.imageIds;
          const images = catalogImages?.filter(({ id }) =>
            itemImages?.includes(id)
          );
          return (
            <div key={id} className="basis-full md:basis-1/3">
              <Link href={`/shop/product/${encodeURIComponent(id)}`}>
                <ProductItem itemData={itemData} images={images} />
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

const EmptyProductGrid = () => (
  <div>
    <div>
      <div className="text-center my-5">
        <p>Oddly, we don't have any clothes right now.</p>
      </div>
    </div>
  </div>
);

export default ProductGrid;
