import Link from "next/link";
import ProductItem from "./ProductGridItem";
import { AppProps } from "index";
import { CatalogObject } from "square";

type Props = {
  catalogItems: CatalogObject[];
  catalogImages: CatalogObject[];
} & AppProps;

const ProductGrid = ({ catalogItems, catalogImages }: Props) => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-3 lg:grid-cols-4 md:grid-rows-3 gap-y-12 gap-x-12 w-full max-w-full">
      {!catalogItems ? (
        <EmptyProductGrid />
      ) : (
        catalogItems?.map(({ itemData = {}, id }) => {
          const itemImages = itemData?.imageIds;
          const images = catalogImages?.filter(({ id }) =>
            itemImages?.includes(id)
          );
          return (
            <div key={id} className="md:col-span-1 row-auto">
              <Link href={`/shop/product/${itemData.name?.toLowerCase().replaceAll(" ", "-")}?id=${encodeURIComponent(id)}`}>
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
