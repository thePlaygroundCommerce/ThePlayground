import React, { ReactElement, ReactNode } from "react";
import { Heading } from "rsuite";
import { AppProps } from "index";
import Image from "./Image";
import Carousel from "./Carousel";
import Link from "next/link";
import Button from "./Button";
import { isFilled, KeyTextField } from "@prismicio/client";
import clsx from "clsx";
import { contentPositions } from "util/styles";
import { ImageProps } from "next/image";
import { CtaEmailDocumentData } from "prismicio-types";
import { latoLight } from "app/fonts";

export type HeroProps = {
  type: "static" | "carousel";
  items: Content[];
  content?: Content;
  classes?: {
    container?: string;
    contentContainer?: string;
  };
} & AppProps;

export type ContentImage = ImageProps | NonNullable<ReactElement>;
export type Content = {
  image: ContentImage | undefined;
  content?: {
    title: ReactElement | string | null;
    description?: ReactElement | string | null;
    headline?: ReactElement | string | null;
    social_media_handles?: unknown;
    cta?: Omit<CtaEmailDocumentData, 'slices'> ;
    link?: KeyTextField;
    linkLabel?: KeyTextField;
    last_publication_date?: string;
  }
  contentStyles?: {
    content_alignment?: KeyTextField;
    text_content_position?: KeyTextField;
  }
};

export const isImageProps = (obj: ContentImage): obj is ImageProps => {
  return (obj as ImageProps).src !== undefined
}

export const renderContentImage = (image: ContentImage) => isImageProps(image) ? <Image {...image} /> : image

const Hero = ({
  type = "static",
  items,
  items: [{ contentStyles: { text_content_position = "", content_alignment = "" } = {} }],
  classes: { container: _container, contentContainer: _contentContainer } = {},
}: HeroProps) => {
  const { container, contentContainer } = {
    container: clsx("overflow-hidden bgimg w-full h-screen relative", _container),
    contentContainer: clsx(
      'h-full',
      "w-full",
      "md:w-1/4",
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
      <div className="h-full w-full absolute">
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
      </div>
      <div className={contentContainer}>
        {type === "static" && <HeroContent {...items[0]} image={undefined} />}
      </div>
    </div>
  );
};

const HeroContent = ({
  image,
  content: {
    description,
    title,
    last_publication_date,
    cta,
    social_media_handles,
    link,
    linkLabel
  } = { title: "" }
}: Content) => {
  let ImageComponent: ReactNode;

  if (image && isImageProps(image)) {
    ImageComponent = <Image
      {...{
        ...image,
        className: "z-10 h-full object-cover w-full brightness-50",
      }}
    />
  } else {
    ImageComponent = image
  }

  return (
    <div className="w-full h-full relative">
      {image && (
        <div className="w-full h-full absolute">
          {ImageComponent}
        </div>
      )}
      <div className="absolute z-20 w-full flex text-left bottom-0 p-4">
        <div className=" flex flex-col gap-4 text-slate-300">
          <div>
            <Heading level={3} className="w3-animate-top">
              {title}
            </Heading>
            <p className={"text-lg italic" + ` ${latoLight.className}`}>{description}</p>
            {last_publication_date && (
              <p className="text-lg">
                {new Date(last_publication_date).toDateString()}
              </p>
            )}
          </div>
          {link && (
            <Link href={link}>
              <Button variant="primary">{linkLabel || "READ MORE"}</Button>
            </Link>
          )}
        </div>
        {/* {isFilled.contentRelationship<string, string, { slices: [] }>(cta) && (
          <div>
            <SliceZone slices={cta.data?.slices} components={components} />
          </div>
        )}
        {isFilled.contentRelationship(social_media_handles) && (
          <div className="flex justify-center ">
            {slice.items.map(
              ({
                social_media_handle,
              }:
                | HeroSliceHandlesCtaItem
                | HeroSliceHeroWithSocialMediaHandlesItem) => {
                if (hasContentRelationshipData(social_media_handle)) {
                  const slug = social_media_handle.uid;
                  const IconComponent: IconType =
                    SocialMediaComponentMap[slug as keyof SocialMediaIcons];

                  return (
                    <a
                      target="_blank"
                      id={social_media_handle.data.social_media_name}
                      href={social_media_handle.data.social_media_url}
                      className="m-2"
                      key={slug}
                    >
                      <IconComponent />
                    </a>
                  );
                }
              }
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Hero;
