import { getCatalogInfo, getCatalogObjects, searchItems, searchObjects } from "api/catalogApi";
import ProductGrid from "components/ProductGrid";
import { formatNavigationLinks, mapArrayToMap } from "../../../util";
import { getMainNavigation } from "app/layout";
import { CatalogObject, SearchCatalogItemsRequest } from "square";
import { redirect } from "next/navigation";
import { AppProps } from "next/app";
import { PageProps } from "index";
import { callToActionCreateForm, RegisterCustomerRequest, searchCatalogItems } from "api/customerApi";
import Modal from "components/Modal";
import { renderLogo } from "components/LogoComponent";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const { headerNavs } = await getMainNavigation()

  return headerNavs.map(({ title: resource }) => ({
    slug: resource
  }))
}

export default async function Page({ params, searchParams }: PageProps) {
  const { category = "" } = await params
  const { show = true } = await searchParams
  const { items, images } = await searchCatalogItems(category)

  const func = async (state: {}, formData: FormData) => {
    'use server'

    const req: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
      req[key] = value;
    }


    await callToActionCreateForm(req as RegisterCustomerRequest)

    return {
      ...state,
      isSubmitted: true
    }
  }

  return (
    <>
      <ProductGrid
        catalogItems={items}
        catalogImages={images}
      />
      <Modal logo={renderLogo()} show={false} onClose={func} />
    </>
  );
}
