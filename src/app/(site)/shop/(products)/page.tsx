import ProductGrid from "@/components/ProductGrid";
import { PageProps } from "index";
import { callToActionCreateForm, RegisterCustomerRequest, getCategoryProducts } from "@/api/customerApi";
import { ProductGridItemMap } from "@/components/ProductGridItem";
import ProductFiltersSidebar from "@/components/ProductFiltersSidebar";


export default async function Page({ params: _params, searchParams }: PageProps<Record<string, keyof ProductGridItemMap>>) {
  const { category = "", store = "shop" } = await _params
  let items, images;

  const searchRes = await getCategoryProducts(category)
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
    <div className="grid auto-rows-max auto-cols-auto md:grid-cols-6 w-full md:px-4 gap-4 min-h-screen bg-transparent">
      <div className="hidden md:block col-span-2 md:col-span-1 bg-transparent">
        <ProductFiltersSidebar count={items.length} activeFilters={await searchParams} />
      </div>
      <div className="md:mt-0 max-w-full flex justify-center md:justify-start md:min-h-screen col-span-5">
        <div className="mb-4">
          {/* <div className="h-12 w-full"></div> */}
          <ProductGrid
            type={store}
            catalogItems={items}
            catalogImages={images}
          />
        </div>

      </div>
    </div>
  );
}
