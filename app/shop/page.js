import { getCatalogObjects, getCatalogItemsByCategory } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";
import { mapArrayToMap } from "../../util";

export default async function Page({ params }) {
  let products = [],
    relatedObjects = [];
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

    const { objects = [], relatedObjects: relObjs = [] } =
      await getCatalogItemsByCategory(backendReq);

    products = objects;
    relatedObjects = relObjs;
  } else {
    const { objects } = await getCatalogObjects("ITEM,IMAGE");
    products = objects;
  }
  mappedCatalogItems = mapArrayToMap([...products, ...relatedObjects, ...categories]);
  

  return (
    <ProductGrid
      catalogItems={mappedCatalogItems.items}
      catalogImages={mappedCatalogItems.images}
    />
  );
}
