import { getCatalogObjects, getCatalogItemsByCategory } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";
import { mapArrayToMap } from "../../../../../util";

export default async function Page({ params }) {
  let mappedCatalogItems = {
    items: [],
    images: [],
  };
  const { objects: categories } = await getCatalogObjects("CATEGORY");
  const foundCategory = categories.find(
    ({ categoryData: { name } }) =>
      name.split(" ").pop().toLowerCase() == params.category
  );

  if (foundCategory) {
    const backendReq = {
      objectTypes: ["ITEM", "IMAGE"],
      query: {
        exactQuery: {
          attributeName: "category_id",
          attributeValue: foundCategory.id,
        },
      },
      includeRelatedObjects: true,
    };

    const { objects: products = [], relatedObjects = [] } =
      await getCatalogItemsByCategory(backendReq);

    mappedCatalogItems = mapArrayToMap([...products, ...relatedObjects]);
  }

  return (
    <ProductGrid
      catalogItems={mappedCatalogItems.items}
      catalogImages={mappedCatalogItems.images}
    />
  );
}
