"use client";

import * as prismic from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";
import { components } from "..";
import Image from "next/image";
import Logo from "/public/The Playground Logo_White.svg";
import clsx from "clsx";
import {
  HeroSliceHandlesCtaItem,
  HeroSliceHeroWithSocialMediaHandlesItem,
  HeroSliceVariation,
} from "../../../prismicio-types.js";
import { IconType } from "react-icons";
import SocialMediaComponentMap, {
  SocialMediaIcons,
} from "../../../constants/SocialMediaComponentMap";
import { Carousel } from "rsuite";
import { contentPositions } from "util/styles";
import Heading from "components/typography/Heading";
import Button from "components/Button";
import Link from "next/link";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<prismic.Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({
  slice,
  slice: {
    items,
    primary,
    primary: {
      // link = "",
      hero_description,
      hero_title,
      content_alignment,
      use_logo,
    },
  },
}: HeroProps): JSX.Element => {

  const hasContentRelationshipData = <
    TContentRelationshipField extends prismic.ContentRelationshipField,
  >(
    contentRelationshipField: TContentRelationshipField
  ): contentRelationshipField is TContentRelationshipField & {
    uid: string;
    data: {
      social_media_name: string | undefined;
      social_media_url: string | undefined;
      slices: prismic.SliceZone;
    };
  } => {
    return prismic.isFilled.contentRelationship(contentRelationshipField);
  };

  const prepareBgVisual = ({ variation, primary }: HeroSliceVariation) => {
    const imageProps = {
      src: "",
      alt: "Picture of the author",
      className: "-z-10 h-full object-cover w-full",
    };
    switch (variation) {
      case "carousel":
        return (
          <Carousel className="h-full" autoplay>
            {items.map(({ hero_bg_image }: any) => (
              <Image
                key={hero_bg_image.url}
                {...imageProps}
                src={hero_bg_image.url}
                className="object-cover"
                width={hero_bg_image.dimensions.width}
                height={hero_bg_image.dimensions.height}
              />
            ))}
          </Carousel>
        );
      default:
        imageProps.src = primary.hero_bg_image.url ?? "";
        return <Image {...imageProps} width={primary.hero_bg_image.dimensions?.width} height={primary.hero_bg_image.dimensions?.height} />;
    }
  };

  const classNames = {
    sliceContainer: clsx("overflow-hidden bgimg w-full h-screen relative"),
    heroContainer: "",
    // @ts-ignore
    textContainerWidth: clsx("px-4", "w-full", "md:w-1/4", "absolute", contentPositions[primary.text_content_position], "text-black", "text-" + content_alignment?.toLowerCase())
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(primary.fluid_container && "px-12")}
    >
      <div className={classNames.sliceContainer}>
        <div className="w-full absolute h-screen">
          {prepareBgVisual(slice)}
        </div>
        <div
          className={classNames.textContainerWidth}
        >
          {use_logo && (
            <div className="w-3/4 m-auto">
              <Image
                src={Logo}
                alt="Logo"
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
          )}
          <Heading level={2} className="w3-animate-top">{hero_title}</Heading>
          <div>
            <p className="text-lg">{hero_description}</p>
          </div>
          {(slice.variation == "withCta" || slice.variation == "handlesCta") &&
            hasContentRelationshipData(slice.primary.cta) && (
              <div>
                <SliceZone
                  slices={slice.primary.cta.data.slices}
                  components={components}
                />
              </div>
            )}
          {(slice.variation === "handlesCta" ||
            slice.variation === "heroWithSocialMediaHandles") && (
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
            )}
          <div className="mt-6">
            <Link href="/shop"><Button variant="primary">SHOP NOW</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
