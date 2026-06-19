import type { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/app/slices";
import { client } from "@/api/clients";
import { notFound, redirect } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { getProductDetails } from "../../(site)/shop/(product)/product/[slug]/page";
import ProductImageGallery from "@/components/ProductImageGallery";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Link from "next/link";
import { CatalogObject } from "square";

type LANDING_URL = "/landing/[uid]"

export default async function Page({ params }) {
  const { uid } = await params;

  return client.getByUID("product_landing_page", uid)
    .then(({ data: { slices, product_id: slug, ...rest } }) => {

      if (!slug) {
        throw new Error("Missing product slug");
      }
      return {
        ...rest,
        sliceZone: <SliceZone slices={slices} components={components} />,
        slug,
      };
    })
    .then(({ slug, ...rest }) => getProductDetails({ slug }).then((data) => ({ data, ...rest }))
    )
    .then(({ sliceZone, title, description, data: { filteredRelatedImages, catalogObject }, quick_points }) => {
      const headAndCaption = (
        <div className="p-4">
          <h1 className="mb-2 p-0 font-black text-3xl">{title}</h1>
          <p className="text-lg">{description}</p>
        </div>
      )

      const buyNow = (
        <Link href={`/checkout?buyNow=${(catalogObject as CatalogObject.Item).itemData.variations[0].id}`} className="px-4 w-full md:w-3/4 mx-auto">
          <Button className="border rounded-full p-4 gradient_mesh text-white w-full k-btn ">Buy Now</Button>
        </Link>
      )


      return (
        <>
          <div className="mb-6 lg:flex md:min-h-[75vh] md:m-24">
            <div className="flex-1 h-[45vh] md:h-auto overflow-hidden">
              <ProductImageGallery images={filteredRelatedImages} />
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
                  {buyNow}
                  <div className="text-xs uppercase">
                    <p>use code PLAY10 for 10% off</p>
                  </div>
                </div>
              </div>
              <div className="px-8 py-2 md:hidden">
                <div className="h-.5 rounded border mx-auto bg-black" />
              </div>
              <div className="flex justify-center py-2 gap-4 md:gap-24">
                <div className="flex flex-col grow-0 shrink items-center text-center">
                  <div className="size-12 overflow-hidden relative mb-2">
                    <Image src={"/handshake.png"} alt={""} />
                  </div>
                  <p>Quality<br />Guaranteed</p>
                </div>
                <div className="flex flex-col grow-0 shrink items-center text-center">
                  <div className="size-12 overflow-hidden relative mb-2">
                    <Image src={"/feather.png"} alt={""} />
                  </div>
                  <p>Light & Compact<br />Design</p>
                </div>
                <div className="flex flex-col grow-0 shrink items-center text-center">
                  <div className="size-12 overflow-hidden relative mb-2">
                    <Image src={"/security.png"} alt={""} />
                  </div>
                  <p>Zero Questions<br />Return</p>
                </div>
              </div>
            </div>
          </div>
          {sliceZone}
        </>
      )
    })
    .catch((e: Error) => {
      console.log(`Either page or product retrieval failed! ${e.message}`)
      redirect("/")
    });
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
  const pages = await client.getAllByType("product_landing_page");

  return pages.map((page) => ({ uid: page.uid }));
}
