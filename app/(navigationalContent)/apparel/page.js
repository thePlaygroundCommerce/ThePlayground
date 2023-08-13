import { getCatalogObjects } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";

export default async function Page() {
  const catalogItems = await getCatalogObjects("CATEGORY,IMAGE,ITEM");

  const mappedCatalogItems = {};
  catalogItems?.objects.forEach((item) => {
    const lowerCaseItemType = item.type.toLowerCase();
    const key =
      lowerCaseItemType == "category"
        ? lowerCaseItemType.slice(0, -1) + "ies"
        : lowerCaseItemType + "s";

    mappedCatalogItems[key] =
      mappedCatalogItems[key] === undefined
        ? [item]
        : mappedCatalogItems[key].concat(item);
  });

  return (
    <ProductGrid
      catalogItems={mappedCatalogItems.items}
      catalogImages={mappedCatalogItems.images}
    />
  );
}
