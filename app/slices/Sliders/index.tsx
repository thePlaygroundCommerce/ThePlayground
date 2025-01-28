import { Content, isFilled, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { getCatalogItemsAndImages } from "api/catalogApi";
import { BlogDocumentData } from "prismicio-types";
import { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import Slider from "components/Slider";
import { ImageProps } from "index";

/**
 * Props for `Sliders`.
 */
export type SlidersProps = SliceComponentProps<Content.SlidersSlice>;

/**
 * Component for "Sliders" Slices.
 */
const Sliders = async ({ slice, slice: { slice_type, primary, variation, primary: { slider_title, sliderheadline } } }: SlidersProps): Promise<JSX.Element> => {
  let slides: TypeOmittedSlideProps[] = [];

  switch (slice.variation) {
    case "icons":

      break;
    case "blog":
      slice.primary.items.forEach(({ blog }) => {
        if (!isFilled.contentRelationship<'blog', string, BlogDocumentData>(blog)) return
        const { data: { title, headline, coverimage: { url = "", alt = "", dimensions = {} } = {} } = {} } = blog
        slides.push({
          content: {
            link: "",
            title: title ?? "",
            headline: headline ?? "",
          },
          image: {
            objectFit: primary.imagefit,
            src: url ?? "",
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
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className=" p-8"
    >
      <Slider type={variation.toUpperCase() as SlideProps['type']} title={slider_title} headline={sliderheadline} slides={slides} />
    </section>
  );
};

const getProducts = async (object_ids: string | KeyTextField, imagefit: ImageProps["objectFit"]): Promise<TypeOmittedSlideProps[]> => {
  const ids = object_ids?.split(",").map(id => id.replace(" ", "")).filter(id => id !== null) ?? []
  const { objects = [], relatedObjects } = (await getCatalogItemsAndImages(ids))

  return objects.map(({ itemData: { name, imageIds, variations } = {} }) => {
    const [{ itemVariationData: { priceMoney: { amount = BigInt(0) } = {} } = {} }] = variations ?? []
    const { url, caption: alt } = relatedObjects?.find(({ id }) => imageIds?.[0] === id)?.imageData ?? {}
    return {
      image: {
        imagefit,
        src: url ?? "",
        alt: alt ?? ""
      },
      content: {
        title: name ?? "",
        price: Number(amount),
        link: "/shop"
      }
    }
  })
}
export default Sliders;
