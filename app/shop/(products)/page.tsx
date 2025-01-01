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

const searchCatalogItems = async (category: string) => {
  const formattedCategory = formatNavigationLinks(category)
  const id = (await getCatalogInfo()).categoryNameMap[formattedCategory]
  console.log(id)
  const searchPayload: SearchCatalogItemsRequest = {};

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
