import Link from "next/link";
import ProductItem from "./ProductGridItem";
import { AppProps } from "types";
import { CatalogObject } from "square";
import ShopNavigation from "./ShopNavigation";

type Props = {
  catalogItems: CatalogObject[];
  catalogImages: CatalogObject[];
} & AppProps;

const ProductGrid = ({ catalogItems, catalogImages }: Props) => {
  return (
    <div className=" pt-6">
      <div className="flex justify-end">
        <button className="mr-12">Sort</button>
      </div>
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-5 w-full">
        <div className="row-span-1 md:col-span-1">
          <ShopNavigation />
        </div>
        <div className="col-span-4 flex flex-wrap max-w-full">
          {!catalogItems ? (
            <EmptyProductGrid />
          ) : (
            catalogItems?.map(({ itemData = {}, id }) => {
              const itemImages = itemData?.imageIds;
              const images = catalogImages?.filter(({ id }) =>
                itemImages?.includes(id)
              );
              return (
                <div key={id} className="basis-1/3">
                  <Link href={`/shop/product/${encodeURIComponent(id)}`}>
                    <ProductItem itemData={itemData} images={images} />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyProductGrid = () => (
  <div>
    <div>
      <div className="text-center  my-5">
        <p>Oddly, we don't have any clothes right now.</p>
      </div>
    </div>
  </div>
);

export default ProductGrid;
