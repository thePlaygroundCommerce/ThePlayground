import { getCatalogObjects, searchObjects } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";
import { mapArrayToMap } from "../../../util";
import { getMainNavigation } from "app/layout";
import { CatalogObject } from "square";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const { headerNavs } = await getMainNavigation()

  return headerNavs.map(({ title: resource }) => ({
    slug: resource
  }))
}

export const getCategorizedObjects = async (resource: string) => {
  let products = [],
    relatedObjects: CatalogObject[] = [];
  let mappedCatalogItems = {
    items: [],
    images: [],
  };
  const { objects: categories } = await getCatalogObjects("CATEGORY");
  const foundCategory = categories.find(
    ({ categoryData: { name } }: { categoryData: { name: string } }) =>
      name.split(" ").pop()?.toLowerCase() == resource.toLowerCase()
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
      (await searchObjects(false, backendReq)).result;

    products = objects;
    relatedObjects = relObjs;
  } else {
    const { objects } = await getCatalogObjects("ITEM,IMAGE");
    products = objects;
  }
  return mapArrayToMap([...products, ...relatedObjects, ...categories]);

}

export default async function Page({ params: { resource = "" } }) {
  let { items, images } = await getCategorizedObjects(resource)

  items = [items[0]]

  return (
    <ProductGrid
      catalogItems={items}
      catalogImages={images}
    />
  );
}
