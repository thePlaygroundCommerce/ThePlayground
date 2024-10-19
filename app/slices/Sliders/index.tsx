import { Content, GroupField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Window } from "../WindowPanels";
import { getCatalogItemsAndImages } from "api/catalogApi";
import { CatalogObject } from "square";
import { Simplify } from "prismicio-types";

/**
 * Props for `Sliders`.
 */
export type SlidersProps = SliceComponentProps<Content.SlidersSlice>;

/**
 * Component for "Sliders" Slices.
 */
const Sliders = async ({ slice, slice: { variation, primary: { slider_title, sliderheadline, ...rest } } }: SlidersProps): Promise<JSX.Element> => {
  let slides: any[] = await determineVariation(variation, rest);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-96 p-24"
    >
      <h3 className="text-center m-12">{slider_title}</h3>
      <h3 className="text-center m-6">{sliderheadline}</h3>
      <div className="flex justify-around gap-24">
        {slides.map(
          (
            slide, i
          ) => (
            <div
              key={i}
              className=" w-full max-w-full"
            >
              <Window
                {...slide}
              />
            </div>
          )
        )}
      </div>
    </section>
  );
};

const determineVariation = async (variation, primary) => {
  switch (variation) {
    case "blog":
      return primary.items.map(({ blog: { data: { title, headline, coverimage: { url: src, alt } } } }) => ({
        contentData: {
          title,
          headline
        },
        imageData: {
          src,
          alt: alt ?? ""
        }
      }))
    case "default":
      return await getProducts(primary.object_ids)
    default:
      break;
  }

}

const getProducts = async (object_ids: string): Promise<Window[]> => {
  const ids = object_ids?.split(",").map(id => id.replace(" ", "")).filter(id => id !== null) ?? []
  const { objects = [], relatedObjects } = (await getCatalogItemsAndImages(ids)).result

  return objects.map(({ itemData: { name, imageIds, variations: [{ itemVariationData: { priceMoney: { amount } } }] } }) => {
    const { url: src, caption: alt } = relatedObjects.find(({ id }) => imageIds.includes(id)).imageData
    return {
      imageData: {
        src,
        alt
      },
      contentData: {
        title: name,
        price: amount
      }
    }
  })
}
export default Sliders;
