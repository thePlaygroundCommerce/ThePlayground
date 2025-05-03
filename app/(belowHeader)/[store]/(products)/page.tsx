import ProductGrid from "components/ProductGrid";
import { getMainNavigation } from "app/layout";
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
  const { category = "", store = "shop" } = await params
  let items, images;

  const searchRes = await searchCatalogItems(category)
  items = searchRes.items
  images = searchRes.images

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
    <div className="">
      <ProductGrid
        type={store}
        catalogItems={items}
        catalogImages={images}
      />
      <Modal logo={renderLogo()} show={false} onClose={func} />
    </div>
  );
}
