import { SliceZone } from '@prismicio/react';
import { components } from 'app/slices';
import clsx from 'clsx';
import SocialMediaComponentMap, { SocialMediaIcons } from 'constants/SocialMediaComponentMap';
import { slice } from 'lodash';
import { HeroSliceVariation, HeroSliceHandlesCtaItem, HeroSliceHeroWithSocialMediaHandlesItem } from 'prismicio-types';
import React from 'react'
import { IconType } from 'react-icons';
import { Heading } from 'rsuite';
import { AppProps } from 'types';
import Image from './Image';
import { PrismicNextImage } from '@prismicio/next';
import Carousel from './Carousel';

type Props = {
    type: 'static' | 'carousel'
    items: {
        imageProps: {
            src: string,
            width: number,
            height: number,
        },
        title: string,
        headline: string,
        cta: {},
    }[],
} & AppProps

const Hero = ({
    type = 'static',
    items
}: Props) => {
    const ImageComponent = Image || PrismicNextImage

    return (
        <Carousel>
            {items.map(({ imageProps, headline, title }, i) => (
                <div key={i} className="w-full h-full relative">
                    <div className="w-full h-full absolute">
                        <ImageComponent {...{ ...imageProps, className: "z-10 h-full object-cover w-full" }} />
                    </div>
                    <div className="absolute z-20 w-full h-full flex justify-center text-center items-center">
                        <div>
                            <Heading level={2} className="w3-animate-top">{title}</Heading>
                            <p className="text-lg">date</p>
                            <p className="text-lg">cta</p>
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


        </Carousel>
    );


    switch (type) {
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

    // const classNames = {
    //     sliceContainer: clsx("overflow-hidden bgimg w-full h-screen relative"),
    //     heroContainer: "",
    //     // @ts-ignore
    //     textContainerWidth: clsx("w-full", "md:w-1/4", "absolute", contentPositions[primary.text_content_position], "text-black", "text-" + content_alignment?.toLowerCase())
    // }

    return (
        <div className={""}>
            <div className="w-full absolute h-screen">
                {prepareBgVisual()}
            </div>
            <div
            // className={classNames.textContainerWidth}
            >
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
                <Heading level={2} className="w3-animate-top">{title}</Heading>
                <div>
                    <p className="text-lg">{desc}</p>
                </div>
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
    )
}

export default Hero


