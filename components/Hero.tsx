import React from "react";
import { Heading } from "rsuite";
import { AppProps } from "index";
import Image from "./Image";
import { PrismicNextImage } from "@prismicio/next";
import Carousel from "./Carousel";
import Link from "next/link";
import Button from "./Button";
import { ImageField, isFilled, KeyTextField } from "@prismicio/client";
import { components } from "app/slices";
import { SliceZone } from "@prismicio/react";
import clsx from "clsx";
import { contentPositions } from "util/styles";
import { Description } from "@headlessui/react";
import { ImageProps } from "next/image";

export type HeroProps = {
  type: "static" | "carousel";
  items: Content[];
  content?: Content;
  classes?: {
    container?: string;
    contentContainer?: string;
  };
} & AppProps;

export type Content = {
  image?: ImageProps;
  content?: {
    title: KeyTextField;
    description?: KeyTextField;
    headline?: KeyTextField;
    social_media_handles?: unknown;
    cta?: unknown;
    link?: KeyTextField;
    last_publication_date?: string;
  }
  contentStyles?: {
    content_alignment?: KeyTextField;
    text_content_position?: KeyTextField;
  }
};

const Hero = ({
  type = "static",
  items,
  items: [{ contentStyles: { text_content_position = "", content_alignment = "" } = {} }],
  classes: { container: _container, contentContainer: _contentContainer } = {},
}: HeroProps) => {
  const { container, contentContainer } = {
    container: clsx("overflow-hidden bgimg w-full h-screen relative", _container),
    contentContainer: clsx(
      "px-4",
      "w-full",
      "md:w-1/4",
      "absolute",
      isFilled.keyText(text_content_position)
        ? contentPositions[text_content_position]
        : null,
      "text-black",
      "text-" + content_alignment?.toLowerCase(),
      _contentContainer
    ),
  };

  return (
    <div className={container}>
      <div className="h-full">
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
        {type === "static" && <HeroContent {...items[0]} />}
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
  } = { title: "" }
}: Content) => {

  const ImageComponent = Image || PrismicNextImage;
  return (
    <div className="w-full h-full relative">
      {image && (
        <div className="w-full h-full absolute">
          <ImageComponent
            {...{
              ...image,
              className: "z-10 h-full object-cover w-full",
            }}
          />
        </div>
      )}
      <div className="absolute z-20 w-full h-full flex justify-center text-center items-center">
        <div>
          <Heading level={2} className="w3-animate-top">
            {title}
          </Heading>
          <div>
            <p className="text-lg">{description}</p>
          </div>
          {last_publication_date && (
            <p className="text-lg">
              {new Date(last_publication_date).toDateString()}
            </p>
          )}
          {link && (
            <Link href={link}>
              <Button variant="primary">READ MORE</Button>
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
