import { getCatalogObjects, getCatalogItemsByCategory } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";
import { mapArrayToMap } from "../../../../../util";

export default async function Page({ params }) {
  const { objects: categories } = await getCatalogObjects("CATEGORY");
  const { id } = categories.find(
    ({ categoryData: { name } }) =>
      name.split(" ").pop().toLowerCase() == params.category
  );

  const backendReq = {
    objectTypes: ["ITEM", "IMAGE"],
    query: {
      exactQuery: {
        attributeName: "category_id",
        attributeValue: id,
      },
    },
    includeRelatedObjects: true,
  };

  const { objects: products = [], relatedObjects = [] } = await getCatalogItemsByCategory(
    backendReq
  );

  const mappedCatalogItems = mapArrayToMap([...products, ...relatedObjects]);

  return (
    <ProductGrid
      catalogItems={mappedCatalogItems.items}
      catalogImages={mappedCatalogItems.images}
    />
  );
}
