"use client";

import React, { useState } from "react";
import Image from "./Image";

import staticImages from "util/images";
import clsx from "clsx";

type Props = {};

const TabSlider = (props: Props) => {
    const [activeindex, setActiveIndex] = useState(0);

    const b = ["kids", "babies", "shirts", "sweatshirts", "accessories"];
    const a = [
        <>
            <div className="k-tab-desc">
                <div className="k-para-1">
                    Check out this spring summer 2019 must-haves for men that bring out
                    your modern and fun side. Discover the latest trends in T-shirts,
                    trousers, shorts or shoes with an alternative touch for the summer
                    outfits that you can&#x27;t live without.
                </div>
            </div>
            <div className="k-tab-slider-wrapper">
                <div
                    data-delay="4000"
                    data-animation="slide"
                    className="k-full-w-slider w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                >
                    <div className="k-f-slider-mask w-slider-mask">
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.one}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt="A cute baby wearing Mass summer collection niker"
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.two}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.arthouse}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-left">
                        <div className="w-icon-slider-left"></div>
                    </div>
                    <div className="k-full-slider-r-arrow hide-arrow w-slider-arrow-right">
                        <Image src={staticImages.ctrlLeft} loading="lazy" alt="" />
                    </div>
                    <div className="hide-slider-dots w-slider-nav"></div>
                </div>
            </div>
        </>,
        <>
            <div className="k-tab-desc">
                <div className="k-para-1 k-text-gray-1">
                    Check out this spring summer 2019 must-haves for men that bring out
                    your modern and fun side. Discover the latest trends in T-shirts,
                    trousers, shorts or shoes with an alternative touch for the summer
                    outfits that you can&#x27;t live without.
                </div>
            </div>
            <div className="k-tab-slider-wrapper">
                <div
                    data-delay="4000"
                    data-animation="slide"
                    className="k-full-w-slider w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                >
                    <div className="k-f-slider-mask w-slider-mask">
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.castorly}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.dina}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.anastasiya}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-left">
                        <div className="w-icon-slider-left"></div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-right">
                        <div className="w-icon-slider-right"></div>
                    </div>
                    <div className="hide-slider-dots w-slider-nav"></div>
                </div>
            </div>
        </>,
        <>
            <div className="k-tab-desc">
                <div className="k-para-1 k-text-gray-1">
                    Check out this spring summer 2019 must-haves for men that bring out
                    your modern and fun side. Discover the latest trends in T-shirts,
                    trousers, shorts or shoes with an alternative touch for the summer
                    outfits that you can&#x27;t live without.
                </div>
            </div>
            <div className="k-tab-slider-wrapper">
                <div
                    data-delay="4000"
                    data-animation="slide"
                    className="k-full-w-slider w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                >
                    <div className="k-f-slider-mask w-slider-mask">
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.castorly}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.dina}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.anastasiya}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-left">
                        <div className="w-icon-slider-left"></div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-right">
                        <div className="w-icon-slider-right"></div>
                    </div>
                    <div className="hide-slider-dots w-slider-nav"></div>
                </div>
            </div>
        </>,
        <>
            <div className="k-tab-desc">
                <div className="k-para-1 k-text-gray-1">
                    Check out this spring summer 2019 must-haves for men that bring out
                    your modern and fun side. Discover the latest trends in T-shirts,
                    trousers, shorts or shoes with an alternative touch for the summer
                    outfits that you can&#x27;t live without.
                </div>
            </div>
            <div className="k-tab-slider-wrapper">
                <div
                    data-delay="4000"
                    data-animation="slide"
                    className="k-full-w-slider w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                >
                    <div className="k-f-slider-mask w-slider-mask">
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.castorly}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.dina}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.anastasiya}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-left">
                        <div className="w-icon-slider-left"></div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-right">
                        <div className="w-icon-slider-right"></div>
                    </div>
                    <div className="hide-slider-dots w-slider-nav"></div>
                </div>
            </div>
        </>,
        <>
            <div className="k-tab-desc">
                <div className="k-para-1 k-text-gray-1">
                    Check out this spring summer 2019 must-haves for men that bring out
                    your modern and fun side. Discover the latest trends in T-shirts,
                    trousers, shorts or shoes with an alternative touch for the summer
                    outfits that you can&#x27;t live without.
                </div>
            </div>
            <div className="k-tab-slider-wrapper">
                <div
                    data-delay="4000"
                    data-animation="slide"
                    className="k-full-w-slider w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                >
                    <div className="k-f-slider-mask w-slider-mask">
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.castorly}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.dina}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                        <div className="k-full-slide w-slide">
                            <a
                                href="#"
                                className="k-full-light-box w-inline-block w-lightbox"
                            >
                                <Image
                                    src={staticImages.anastasiya}
                                    loading="lazy"
                                    sizes="87vw"
                                    alt=""
                                    className="k-lightbox-thumbnail"
                                />
                                <Image
                                    src={staticImages.Icon}
                                    loading="lazy"
                                    alt=""
                                    className="k-lighbox-play"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-left">
                        <div className="w-icon-slider-left"></div>
                    </div>
                    <div className="hide-arrow w-slider-arrow-right">
                        <div className="w-icon-slider-right"></div>
                    </div>
                    <div className="hide-slider-dots w-slider-nav"></div>
                </div>
            </div>
        </>,
    ];

    return (
        <div className="transform">
            <div
                data-duration-in="300"
                data-duration-out="100"
                data-current="Tab 1"
                data-easing="ease"
                className="k-full-w-tabs w-tabs"
            >
                <div className="k-tabs-menu w-tab-menu">
                    {b.map((tab, i) => (
                        <a
                            key={tab}
                            data-w-tab={"Tab" + (i + 1)}
                            onClick={() => setActiveIndex(i)}
                            className={clsx(
                                "k-tab-link w-inline-block w-tab-link",
                                i === activeindex && "w--current"
                            )}
                        >
                            <div>{tab}</div>
                        </a>
                    ))}
                </div>
                <div className="w-tab-content">
                    {a.map((ele, i) => (
                        <div
                            key={i}
                            data-w-tab={"Tab " + (i + 1)}
                            className={clsx(
                                "k-tabs-pane w-tab-pane",
                                i === activeindex &&
                                "w--tab-active opacity-100 transition duration-300"
                            )}
                        >
                            {ele}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabSlider;
