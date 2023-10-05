import * as prismic from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";
import { components } from "..";
import Image from "next/image";
import Logo from "/public/The Playground Logo_White.svg";
import clsx from "clsx";
import {
  HeroSliceHandlesCtaItem,
  HeroSliceHeroWithSocialMediaHandlesItem,
} from "../../../prismicio-types.js";
import { IconType } from "react-icons";
import SocialMediaComponentMap, {
  SocialMediaIcons,
} from "../../../constants/SocialMediaComponentMap";

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
    primary: {
      hero_description,
      hero_title,
      hero_bg_image,
      content_alignment,
      use_logo,
    },
  },
}: HeroProps): JSX.Element => {
  const hasContentRelationshipData = <
    TContentRelationshipField extends prismic.ContentRelationshipField
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

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center items-center bgimg w-full h-screen w3-display-container text-white"
    >
      {hero_bg_image?.url && (
        <Image
          src={hero_bg_image.url}
          layout="fill"
          alt="Picture of the author"
          className="-z-10"
          objectFit="cover"
        />
      )}
      <div
        className={clsx("w-full", "text-" + content_alignment?.toLowerCase())}
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
        <h1 className="w3-animate-top">{hero_title}</h1>
        <p className="font-bold">{hero_description}</p>
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
      </div>
    </section>
  );
};

export default Hero;
