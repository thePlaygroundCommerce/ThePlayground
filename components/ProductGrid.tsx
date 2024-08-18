import Link from "next/link";
import ProductItem from "./ProductGridItem";
import { AppProps } from "types";
import { CatalogObject } from "square";

type Props = {
  catalogItems: CatalogObject[];
  catalogImages: CatalogObject[];
} & AppProps

const ProductGrid = ({ catalogItems, catalogImages }: Props) => {
  return catalogItems == undefined ? (
    <EmptyProductGrid />
    ) : (
      <div className="grid  grid-cols-1 md:grid-cols-4 w-full pt-6">
      {catalogItems?.map(({ itemData = {} , id }) => {
        const itemImages = itemData?.imageIds;
        const images = catalogImages?.filter(({ id }) => itemImages?.includes(id) );
        return (
          <div key={id}>
            <Link href={`/shop/product/${encodeURIComponent(id)}`}>
              <ProductItem itemData={itemData} images={images} />
            </Link>
          </div>
        );
      })}
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
