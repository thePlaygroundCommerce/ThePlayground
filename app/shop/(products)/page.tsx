import { getCatalogInfo, getCatalogObjects, searchItems, searchObjects } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";
import { formatNavigationLinks, mapArrayToMap } from "../../../util";
import { getMainNavigation } from "app/layout";
import { CatalogObject, SearchCatalogItemsRequest } from "square";
import { redirect } from "next/navigation";
import { AppProps } from "next/app";
import { PageProps } from "index";

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
  const mappedCatalogItems = {
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

const searchCatalogItems = async (category: string) => {
  const formattedCategory = formatNavigationLinks(category)
  const id = (await getCatalogInfo()).categoryNameMap[formattedCategory]
  const searchPayload: SearchCatalogItemsRequest = {};

  console.log(category);

  if (!category) searchPayload.categoryIds = [];
  else if (!id) redirect('/shop')
  else searchPayload.categoryIds = [id];


  const { objects = [] } =
    (await searchItems(false, searchPayload));

  return mapArrayToMap(objects);

}

export default async function Page({ params }: PageProps) {
  const { category = "" } = await params
  const { items, images } = await searchCatalogItems(category)

  return (
    <ProductGrid
      catalogItems={items}
      catalogImages={images}
    />
  );
}
