import { ReactElement } from "react";
import { AppProps, Content, ContentImage } from "index";
import Image from "./Image";
import { WebflowCarousel as Carousel } from "./Carousel";
import { isFilled } from "@prismicio/client";
import clsx from "clsx";
import { contentPositions } from "@/util/styles";
import { ImageProps } from "index";

import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";
import { notFound } from "next/navigation";
import { getProductDetails } from "../app/(site)/shop/(product)/product/[slug]/page";

export type HeroProps = {
  type: string;
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

export const renderContentImage = (image: ContentImage) => isImageProps(image) ? <Image key={image.key} {...image} /> : image

const Hero = ({
  type = "default",
  items,
  items: [{ contentStyles: { text_content_position = "", content_alignment = "" } = {} }],
  classes: { container: _container, contentContainer: _contentContainer } = {},
}: HeroProps) => {
  const { container, contentContainer } = {
    container: clsx("overflow-hidden bgimg w-full relative h-full flex flex-col ", _container),
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

  const Component = map[type]

  return (
    <div className={container}>
      <Component {...{ items }} />
    </div>
  );
};

export const WebflowHero = (props) => {

  return (
    <div className="k-hero">
      <div className="k-hero-content" style={{ height: "calc(100vh - 85px)" }}>
        <Carousel {...props} />
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


const map = {
  "default": WebflowHero,
  "carousel": Carousel,
  "product": ProductHero
}