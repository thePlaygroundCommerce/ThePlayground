"use client";

import * as prismic from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import clsx from "clsx";
import {
  HeroSliceCarouselItem,
  HeroSliceCarouselPrimary,
  HeroSliceDefaultPrimary,
  HeroSliceVariation,
  Simplify,
} from "../../../prismicio-types.js";
import { Carousel } from "rsuite";
import { contentPositions } from "util/styles";
import HeroComponent, { Content } from "components/Hero";

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
    cta,
    link,
  },
  image: prismic.isFilled.image(image) ? { ...image.dimensions, src: image.url, alt: image.alt ?? "" } : undefined,
})

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
    variation === "default" ? [slicePropsToHeroProps(heroContent)] : items.map(({ bg_image }) => ({ bg_image, ...heroContent })).map(slicePropsToHeroProps);
    
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(primary.fluid && "px-12")}
    >
      <HeroComponent type={"static"} items={heroImgs} />
    </section>
  );
};

export default Hero;
