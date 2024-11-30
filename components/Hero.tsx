import React from "react";
import { Heading } from "rsuite";
import { AppProps } from "index";
import Image from "./Image";
import { PrismicNextImage } from "@prismicio/next";
import Carousel from "./Carousel";
import Link from "next/link";
import Button from "./Button";
import { KeyTextField } from "@prismicio/client";

type Props = {
  type: "static" | "carousel";
  items: {
    imageProps: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
    };
    title: KeyTextField;
    headline: KeyTextField;
    cta: {};
    last_publication_date: string;
  }[];
} & AppProps;

const Hero = ({ type = "static", items }: Props) => {
  const ImageComponent = Image || PrismicNextImage;

  return (
    <Carousel
    itemStyles={{ className: "w-full" }}
      items={items.map(({ imageProps, title, last_publication_date }, i) => (
        <div key={i} className="w-full h-full relative">
          <div className="w-full h-full absolute">
            <ImageComponent
              {...{
                ...imageProps,
                className: "z-10 h-full object-cover w-full",
              }}
            />
          </div>
          <div className="absolute z-20 w-full h-full flex justify-center text-center items-center">
            <div>
              <Heading level={2} className="w3-animate-top">
                {title}
              </Heading>
              <p className="text-lg">
                {new Date(last_publication_date).toDateString()}
              </p>
              <Link href="">
                <Button variant="primary">READ MORE</Button>
              </Link>
            </div>
            {/* {use_logo && (
                <div className="w-3/4 m-auto">
                    <Image
                        src={Logo}
                        alt="Logo"
                        style={{ width: "100%", height: "auto" }}
                        priority
                    />
                </div>
            )} */}
            {/* <div>
                        <p className="text-lg">{headline}</p>
                    </div> */}
            {/* {(slice.variation == "withCta" || slice.variation == "handlesCta") &&
                hasContentRelationshipData(slice.primary.cta) && (
                    <div>
                        <SliceZone
                            slices={slice.primary.cta.data.slices}
                            components={components}
                        />
                    </div>
                )} */}
            {/* {(slice.variation === "handlesCta" ||
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
                )} */}
            {/* <div className="mt-6">
        <Link href={link}><Button>SHOP NOW</Button></Link>
      </div> */}
          </div>
        </div>
      ))}
      className="h-[500px]"
    />
  );
};

export default Hero;
