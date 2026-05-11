import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/app/slices";
import { client } from "@/api/clients";
import { notFound, redirect } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { getProductDetails } from "@/app/(site)/shop/(product)/product/[slug]/page";
import ProductImageGallery from "@/components/ProductImageGallery";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "@/components/Image";
import Button from "@/components/Button";

type LANDING_URL = "/landing/[uid]"

export default async function Page({ params }: PageProps<LANDING_URL>) {
  const { uid } = await params;

  const calls = await Promise.allSettled([

    client.getByUID("product_landing_page", uid)
      .then(({ data: { slices } }) => (
        <SliceZone slices={slices} components={components} />
      ))
      .catch((e: Error) => Promise.reject(`Page retrieval failed! ${e.message}`)),


    getProductDetails({ slug: "SYY7FIS7MJHPPRUXQZ4R2WDM" })
      .then(({ catalogObject, filteredRelatedImages }) => (
        <ProductImageGallery images={filteredRelatedImages} />
        // <ProductDetails
        //   productImageGallery={<ProductImageGallery images={filteredRelatedImages} />}
        //   catalogItemObject={catalogObject}
        //   catalogImageObjects={filteredRelatedImages}
        // />
      )).catch((e: Error) => Promise.reject(`Product retrieval failed! ${e.message}`))

  ])

  const isRejectedCall = (call: PromiseSettledResult<any>): call is PromiseRejectedResult => call.status === "rejected"
  const isFulfilledCall = (call: PromiseSettledResult<any>) => call.status === "fulfilled"

  const headAndCaption = (
    <div className="p-4">
      <h1 className="mb-2 p-0 font-black text-3xl">The Best Bone Broth For All-In-One Nutrition</h1>
      <p className="text-lg md:w-3/4">Kettle & Fire is the only bone broth that's delicious, nutritious, and ready to eat in seconds.</p>
    </div>
  )

  if (calls.every(isFulfilledCall)) {
    const [pageSliceZone, productGallery] = calls.map((call: PromiseFulfilledResult<JSX.Element>) => call.value)

    return (
      <>
        <div className="mb-6 lg:flex h-86 md:min-h-[75vh] overflow-hidden md:m-24">
          <div className="flex-1">
            {productGallery}
          </div>
          <div className="flex-1 flex flex-col gap-12 justify-center">
            <div className="md:justify-center">
              <div>
                {headAndCaption}
              </div>
              {/* <div className="flex justify-between mb-2 mt-6 flex-1">
        <div
          data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
          className="k-product-price"
        >
          <Money className="font-bold text-xl" number={price} />
        </div>
        <Rating amount={5} />
      </div> */}
              {/* <h2>{name}</h2> */}
              {/* <p className="k-product-main-desc">
        {description}
      </p> */}
              <ul className="mb-8 p-4">
                {[
                  "All-in-one nutrition your body needs to thrive",
                  "Quick and easy snack that's high protein and low carb",
                  "Clean ingredients to support your gut and immunity",
                  "Delicious flavors that won't sacrifice your health goals"
                ].map((item) => (
                  <li key={item} className="text-xs md:text-base mb-2 flex gap-2 items-center">
                    <FaCircleCheck className="text-green-500 size-5 md:mr-2" />
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
              {/* <div className="mt-4 flex flex-col gap-4 p-4">
          {Object.entries(selectors).map(([k, v]) => (
            <div key={k}>
              <p className="font-semibold uppercase mb-4">{_.capitalize(k)}</p>
              <Selector {...v} />
            </div>
          ))}
        </div> */}
              {/* <div className="bg-linear-to-t from-black to-[#2D3436]"> */}
              {/* <div className="bg-[linear-gradient(to_bottom,#434343,#000000)]"> */}
              {/* <div className="gradient_mesh flex flex-col justify-center">
            <div className="p-4 uppercase">
              <p>use code HG25 for 20% off</p>
            </div>
            <div className="k-add-to-cart-widget text-white border-white p-4">
              {addToCart}
            </div>
          </div> */}
              <div className=" flex flex-col gap-2 items-center ">
                <div className="px-4 w-full md:w-3/4 mx-auto">
                  <Button className="border rounded-full p-4 gradient_mesh text-white w-full">Buy Now</Button>
                </div>
                <div className="text-xs uppercase">
                  <p>use code HG25 for 20% off</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:hidden">
              <div className="h-.5 rounded border mx-auto bg-black" />
            </div>
            <div className="flex justify-center py-2 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="size-12 overflow-hidden relative mb-2">
                  <Image src={"/handshake.png"} alt={""} />
                </div>
                <p>Mouthwatering<br/>Flavors</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="size-12 overflow-hidden relative mb-2">
                  <Image src={"/feather.png"} alt={""} />
                </div>
                <p>Mouthwatering<br/>Flavors</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="size-12 overflow-hidden relative mb-2">
                  <Image src={"/security.png"} alt={""} />
                </div>
                <p>Mouthwatering<br/>Flavors</p>
              </div>
            </div>
          </div>
        </div>
        {pageSliceZone}
      </>
    )
  } else {
    // log error
    calls.filter(isRejectedCall).forEach((a) => {
      const { message, cause }: Error = a.reason
      console.log(message, cause)
    })
    redirect("/")
  }
}

export async function generateMetadata({
  params,
}: PageProps<LANDING_URL>): Promise<Metadata> {
  const { uid } = await params;
  const page = await client.getByUID("product_landing_page", uid)
    .catch(() => undefined);

  return {
    title: page?.data.meta_title,
    description: page?.data.meta_description,
    openGraph: {
      images: [{ url: page?.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const pages = await client.getAllByType("product_landing_page").catch(() => undefined);;

  return [{ uid: "1" }]
  return pages.map((page) => ({ uid: 1 }));
}

// const AddToCart = withProductModifiers(({ addToCart }) => 
//   <div className="k-add-to-cart-widget text-white border-white p-4">
//     {addToCart}
//   </div>
// )