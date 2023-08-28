import { getCatalogObjects } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";
import { mapArrayToMap } from "../../../util";

export default async function Page() {
  const { objects } = await getCatalogObjects("CATEGORY,IMAGE,ITEM");

  const mappedCatalogItems = mapArrayToMap(objects);

  return (
    <ProductGrid
      catalogItems={mappedCatalogItems.items}
      catalogImages={mappedCatalogItems.images}
    />
  );
}
