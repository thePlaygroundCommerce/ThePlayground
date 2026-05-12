import React, { ReactElement, ReactNode } from "react";
import { AppProps, Content, ContentData, ContentImage, Modify } from "index";
import Image from "./Image";
import Carousel, { WebflowCarousel } from "./Carousel";
import Link from "next/link";
import Button from "./Button";
import { isFilled } from "@prismicio/client";
import clsx from "clsx";
import { contentPositions } from "@/util/styles";
import { ImageProps } from "index";
import { latoLight } from "@/app/fonts";

import staticImages from "@/util/images"
import Heading from "./typography/Heading";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";
import { getProduct } from "@/api/catalogApi";
import { notFound } from "next/navigation";
import { getProductDetails } from "@/app/(site)/shop/(product)/product/[slug]/page";

export type HeroProps = {
  type: "static" | "carousel";
  items: Content[];
  content?: Content;
  classes?: {
    container?: string;
    contentContainer?: string;
  };
} & AppProps;

export const isImageProps = (obj: ContentImage): obj is ImageProps => {
  return (obj as ReactElement).type == undefined
}

export const renderContentImage = (image: ContentImage) => isImageProps(image) ? <Image {...image} /> : image

const Hero = ({
  type = "static",
  items,
  items: [{ contentStyles: { text_content_position = "", content_alignment = "" } = {} }],
  classes: { container: _container, contentContainer: _contentContainer } = {},
}: HeroProps) => {
  const { container, contentContainer } = {
    container: clsx("overflow-hidden bgimg w-full relative h-full", _container),
    contentContainer: clsx(
      'h-full',
      "w-full",
      "md:w-1/2",
      "absolute",
      isFilled.keyText(text_content_position)
        ? contentPositions[text_content_position]
        : null,
      // "text-black",
      "text-" + content_alignment?.toLowerCase(),
      _contentContainer
    ),
  };

  return (
    <div className={container}>
      <ProductHero slug="SYY7FIS7MJHPPRUXQZ4R2WDM"/>
      {/* <div className="h-full w-full absolute">
        <Carousel
          itemStyles={{ className: "w-full" }}
          items={items.map(({ image, content }, i) => (
            <HeroContent key={i} {...{
              image: image,
              content: type === 'static' ? undefined : content
            }} />
          ))}
          className="min-h-[500px] h-full"
        />
      </div> */}
      {/* <div className={contentContainer}>
        {type === "static" && <HeroContent {...items[0]} image={undefined} />}
      </div> */}
    </div>
  );
};

export const WebflowHero = () => {
  return (
    <div className="k-hero">
      <div className="k-hero-content" style={{ height: "calc(100vh - 85px)" }}>
        <WebflowCarousel />
      </div>
    </div>
  )
}

const ProductHero = async ({ slug }: { slug: string }) => {
  const { catalogObject, filteredRelatedImages } = await getProductDetails({ slug }).catch(() => notFound())

  return (
    <div className="h-full border-t border-gray-300">
      <ProductDetails
        productImageGallery={<ProductImageGallery images={filteredRelatedImages} />}
        catalogItemObject={catalogObject}
        catalogImageObjects={filteredRelatedImages}
      />
    </div>
  )
}

export default Hero;
