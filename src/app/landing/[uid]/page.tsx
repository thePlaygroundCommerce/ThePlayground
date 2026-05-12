import type { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
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

  let title: string;
  let description: string;
  let quick_points = [];

  const calls = await Promise.allSettled([

    client.getByUID("product_landing_page", uid)
      .then(({ data: { slices, title: _title, description: _description, quick_points: _quick_points } }) => {
        title = _title
        description = _description
        quick_points = _quick_points
        return <SliceZone slices={slices} components={components} />
      }

      )
      .catch((e: Error) => Promise.reject(`Page retrieval failed! ${e.message}`)),


    getProductDetails({ slug: "SYY7FIS7MJHPPRUXQZ4R2WDM" })
      .then(({ catalogObject, filteredRelatedImages }) => (
        <ProductImageGallery images={filteredRelatedImages} />
      )).catch((e: Error) => Promise.reject(`Product retrieval failed! ${e.message}`))

  ])

  const isRejectedCall = (call: PromiseSettledResult<any>): call is PromiseRejectedResult => call.status === "rejected"
  const isFulfilledCall = (call: PromiseSettledResult<any>) => call.status === "fulfilled"

  const headAndCaption = (
    <div className="p-4">
      <h1 className="mb-2 p-0 font-black text-3xl">{title}</h1>
      <p className="text-lg">{description}</p>
    </div>
  )

  if (calls.every(isFulfilledCall)) {
    const [pageSliceZone, productGallery] = calls.map((call: PromiseFulfilledResult<JSX.Element>) => call.value)

    return (
      <>
        <div className="mb-6 lg:flex md:min-h-[75vh] md:m-24">
          <div className="flex-1 h-[45vh] md:h-auto overflow-hidden">
            {productGallery}
          </div>
          <div className="h-full flex-1 flex flex-col gap-2 md:gap-12 justify-center">
            <div className="md:justify-center">
              <div>
                {headAndCaption}
              </div>
              <ul className="md:mb-8 p-4 ">
                {quick_points.map(({ point: item }) => (
                  <li key={item} className="text-xs md:text-base mb-2 flex gap-2 items-center">
                    <FaCircleCheck className="text-green-500 size-5 md:mr-2" />
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
              <div className=" flex flex-col gap-2 items-center ">
                <div className="px-4 w-full md:w-3/4 mx-auto">
                  <Button className="border rounded-full p-4 gradient_mesh text-white w-full">Buy Now</Button>
                </div>
                <div className="text-xs uppercase">
                  <p>use code HG25 for 20% off</p>
                </div>
              </div>
            </div>
            <div className="px-8 py-2 md:hidden">
              <div className="h-.5 rounded border mx-auto bg-black" />
            </div>
            <div className="flex justify-center py-2 gap-4 md:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="size-12 overflow-hidden relative mb-2">
                  <Image src={"/handshake.png"} alt={""} />
                </div>
                <p>Mouthwatering<br />Flavors</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="size-12 overflow-hidden relative mb-2">
                  <Image src={"/feather.png"} alt={""} />
                </div>
                <p>Mouthwatering<br />Flavors</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="size-12 overflow-hidden relative mb-2">
                  <Image src={"/security.png"} alt={""} />
                </div>
                <p>Mouthwatering<br />Flavors</p>
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

  return pages.map((page) => ({ uid: page.uid }));
}

// const AddToCart = withProductModifiers(({ addToCart }) => 
//   <div className="k-add-to-cart-widget text-white border-white p-4">
//     {addToCart}
//   </div>
// )