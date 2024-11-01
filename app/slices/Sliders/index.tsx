import { AnyRegularField, Content, GroupField, isFilled, KeyTextField, SharedSlice, SharedSliceModelVariation, SharedSliceVariation } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { getCatalogItemsAndImages } from "api/catalogApi";
import { CatalogObject } from "square";
import { BlogDocumentData, Simplify, SlidersSlice, SlidersSliceBlog, SlidersSliceDefault, SlidersSliceVariation } from "prismicio-types";
import Window, { WindowProps } from "components/Window";
import Heading from "components/typography/Heading";
import Link from "next/link";
import { PrismicNextImageProps } from "@prismicio/next";
import prismic from "prismicio";

/**
 * Props for `Sliders`.
 */
export type SlidersProps = SliceComponentProps<Content.SlidersSlice>;

/**
 * Component for "Sliders" Slices.
 */
const Sliders = async ({ slice, slice: { primary, primary: { slider_title, sliderheadline } } }: SlidersProps): Promise<JSX.Element> => {
  let slides: WindowProps[] = [];

  switch (slice.variation) {
    case "blog":
      slice.primary.items.forEach(({ blog }) => {
        if (!isFilled.contentRelationship<'blog', string, BlogDocumentData>(blog)) return
        const { data: { title, headline, coverimage: { url = "", alt = "", dimensions = {} } = {} } = {} } = blog
        slides.push({
          contentData: {
            link: "",
            title: title ?? "",
            headline: headline ?? "",
          },
          imageData: {
            imagefit: primary.imagefit,
            url: url ?? "",
            alt: alt ?? ""
          }
        })
      })
      break;
    case "default":
      slides = await getProducts(slice.primary.object_ids, primary.imagefit)
      break;
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" p-8"
    >
      <div className="text-center container mx-auto">
        <Heading>{slider_title}</Heading>
        <p className="my-4">{sliderheadline}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center min-h-96">
        {slides.map(
          (
            slide, i
          ) => (
            <div
              key={i}
              className="basis-full md:basis-1/4 md:shrink"
            >
              <Link href={slide.contentData.link}>
                <Window
                  {...slide}
                />
              </Link>
            </div>
          )
        )}
      </div>
    </section>
  );
};

const getProducts = async (object_ids: string | KeyTextField, imagefit: WindowProps["imageData"]["imagefit"]): Promise<WindowProps[]> => {
  const ids = object_ids?.split(",").map(id => id.replace(" ", "")).filter(id => id !== null) ?? []
  const { objects = [], relatedObjects } = (await getCatalogItemsAndImages(ids))

  return objects.map(({ itemData: { name, imageIds, variations } = {} }) => {
    const [{ itemVariationData: { priceMoney: { amount = BigInt(0) } = {} } = {} }] = variations ?? []
    const { url, caption: alt } = relatedObjects?.find(({ id }) => imageIds?.includes(id))?.imageData ?? {}
    return {
      imageData: {
        imagefit,
        url: url ?? "",
        alt: alt ?? ""
      },
      contentData: {
        title: name ?? undefined,
        price: Number(amount) ?? undefined,
        link: "/shop"
      }
    }
  })
}
export default Sliders;
