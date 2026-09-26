import * as prismic from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { HeroSliceDefaultPrimary } from "../../../../prismicio-types.js";
import HeroComponent, { isImageProps, renderContentImage } from "@/components/Hero";
import { Content } from "index.js";

const slicePropsToHeroProps = ({
  bg_image: image,
  title,
  description,
  social_media_handles,
  cta,
  link,
  content_alignment,
  text_content_position,
}: HeroSliceDefaultPrimary): Content => ({
  contentStyles: { content_alignment, text_content_position },
  content: {
    title,
    description,
    social_media_handles,
    // cta,
    link,
  },
  image: prismic.isFilled.image(image)
    ? { ...image.dimensions, src: image.url, alt: image.alt ?? "" }
    : { alt: "" },
});

/**
 * Props for `Hero`.
 */
export type PrismicHeroProps = SliceComponentProps<prismic.Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({
  slice,
  slice: { items, primary, variation, primary: heroContent },
}: PrismicHeroProps): JSX.Element => {
  const heroImgs =
    variation === "default"
      ? [slicePropsToHeroProps(heroContent)].map(({ image }, i) =>
        renderContentImage({ key: i,  src: isImageProps(image) && image.src || undefined, className: "object-cover", alt: "" }),
      )
      : items
        .map(({ bg_image }) => ({ bg_image, ...heroContent }))
        .map(slicePropsToHeroProps)
        .map(({ image }, i) =>
          renderContentImage({ key: i, src: isImageProps(image) && image.src || undefined, className: "object-cover", alt: "" }),
        );

  console.log(heroImgs);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx("h-full")}
    >
      <HeroComponent type={variation} items={heroImgs as any} />
    </section>
  );
};

export default Hero;
