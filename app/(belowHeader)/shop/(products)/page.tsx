import ProductGrid from "components/ProductGrid";
import { PageProps } from "index";
import { callToActionCreateForm, RegisterCustomerRequest, searchCatalogItems } from "api/customerApi";
import Modal from "components/Modal";
import { renderLogo } from "components/LogoComponent";


export default async function Page({ params: _params }: PageProps) {
  const params = await _params
  const { category = "", store = "shop" } = await _params
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
