import Link from "next/link";
import ProductItem, { ProductGridItemMap } from "./ProductGridItem";
import { AppProps } from "index";
import { CatalogObject } from "square";
import React, { ReactElement } from "react";

type Props = {
  type: keyof ProductGridItemMap
  catalogItems: any[];
  catalogImages: any[];
} & AppProps;

const ProductGrid = ({ catalogItems, catalogImages, type }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:grid-rows-3 gap-y-6 gap-x-6 w-full max-w-full">
      {!catalogItems ? (
        <EmptyProductGrid />
      ) : (
        catalogItems?.map(({ itemData = {}, id }) => {
          let href;
          const itemImages = itemData?.imageIds;
          const images = catalogImages?.filter(({ id }) =>
            itemImages?.includes(id)
          );

          href = type === 'shop' ? `/${type}/product/${itemData.name?.toLowerCase().replaceAll(" ", "-")}?id=${encodeURIComponent(id)}` : ""

          return (
            <div key={id} className="md:col-span-1 w-full row-auto">
              <Link href={href}>
                <ProductItem type={type} itemData={itemData} images={images} />
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
    <div className="text-center my-5">
      <p>Oddly, we don't have any products right now.</p>
    </div>
    <div>
      
    </div>
  </div>
);

export default ProductGrid;
