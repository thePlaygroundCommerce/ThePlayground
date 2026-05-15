import ProductGrid from "@/components/ProductGrid";
import { PageProps } from "index";
import { callToActionCreateForm, RegisterCustomerRequest, getCategoryProducts } from "@/api/customerApi";
import Image from "@/components/Image";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaArrowsRotate, FaHeadset } from "react-icons/fa6";
import { ProductGridItemMap } from "@/components/ProductGridItem";


export default async function Page({ params: _params }: PageProps<Record<string, keyof ProductGridItemMap>>) {
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
    <div className="mb-4">
      <div className="mb-12">
        <div className="flex bg-black uppercase text-white py-4">
          <div className="flex flex-1 flex-col justify-center items-center">
            <LiaShippingFastSolid size={21} />
            <p className="mt-2 text-sm font-bold text-center">Free Shipping</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <FaArrowsRotate size={21} />
            <p className="mt-2 text-sm font-bold text-center">14 Day Returns</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <FaHeadset size={21} />
            <p className="mt-2 text-sm font-bold text-center">24/7 Service</p>
          </div>
        </div>
        <div className="relative min-h-100 bg-zinc-300 flex justify-center items-center">
          <Image alt={""} className="brightness-75" />
          <div className="z-10 relative text-white p-4">
            <h1 className="capitalize">Duffels</h1>
            <p>The classic workhorse bag updated with innovative features that take it far beyond its utilitarian roots.</p>
          </div>
          <div className="py-2 px-2 absolute -bottom-5 bg-white border border-zinc-500 rounded-lg w-1/4 text-center">
            <p>{items.length} items</p>
          </div>
        </div>
      </div>
      <ProductGrid
        type={store}
        catalogItems={items}
        catalogImages={images}
      />
      {/* <Modal logo={renderLogo()} show={false} onClose={func} /> */}
    </div>
  );
}
