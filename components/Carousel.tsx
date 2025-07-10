"use client";

import clsx from "clsx";
import "keen-slider/keen-slider.min.css";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import React, { useState } from "react";
import Image from "./Image";

import staticImages from "util/images.ts";
import Link from "next/link";
import AnimatedCard from "./AnimatedCard";

type Props = {
  active?: number;
  className?: string;
  onSlide?: (index: number) => void;
  items?: React.JSX.Element[];
  itemStyles?: {
    styles?: {};
    className?: string;
  };
  children?: (
    instance: KeenSliderInstance<
      {},
      {
        track: {
          details: {
            abs: string;
          };
        };
      }
    >
  ) => JSX.Element[];
};

const Carousel = ({
  itemStyles,
  items,
  children,
  className,
  onSlide = () => {},
}: Props) => {
  const [ready, setReady] = useState(false);
  const options = {
    slideChanged({
      track: {
        details: { abs },
      },
    }: any) {
      onSlide(abs);
    },
    created() {
      setReady(true);
    },
  };
  const [sliderRef, instanceRef] = useKeenSlider(options);

  React.useEffect(() => {
    instanceRef.current?.update({
      ...options,
    });
  }, [ready]);

  const render = () => {
    const value = items
      ? items
      : (children && children(instanceRef.current)) ?? [];

    return value.map((child, i) => (
      <div
        key={i}
        className={clsx(itemStyles?.className, "keen-slider__slide h-full")}
      >
        {child}
      </div>
    ));
  };

  return (
    <div
      ref={sliderRef}
      className={clsx(className, "keen-slider overflow-hidden")}
    >
      {ready && instanceRef.current && render()}
    </div>
  );
};

export const WebflowCarousel = ({
  title = "Solo Dolo...",
  description = "Going at it alone? Peek our Solo Traveler collection.",
}) => {
  return (
    <div
      data-delay="4000"
      data-animation="cross"
      className="k-hero-slider-2 w-slider"
      data-autoplay="true"
      data-easing="ease"
      data-hide-arrows="false"
      data-disable-swipe="true"
      data-autoplay-limit="0"
      data-nav-spacing="3"
      data-duration="0"
      data-infinite="true"
    >
      <AnimatedCard />
      {/* <div className="k-hero-slider-menu">
        <a
          id="prev_slide"
          href="#"
          className="k-slider-btn k-slider-btn-left w-inline-block"
        >
          <Image
            src={staticImages.ctrlLeft}
            loading="lazy"
            alt=""
            className="k-checvron"
          />
          <div className="sr-only">previos-slide</div>
        </a>
        <a
          id="next_slide"
          href="#"
          className="k-slider-btn k-slider-btn-right w-inline-block"
        >
          <Image
            src={staticImages.ctrlRight}
            loading="lazy"
            alt=""
            className="k-checvron"
          />
          <div className="sr-only">goto next slide</div>
        </a>
      </div> */}
      {/* <div id="slides_count_wrapper" className="k-slider-numbers">
        <div id="counter" className="k-active-no-slide">
          01
        </div>
        <div className="k-total-no-slides">/</div>
        <div id="total_Slides" className="k-total-no-slides">
          04
        </div>
      </div> */}
      <div className="k-slider-mask-2 w-slider-mask">
        <div className="k-hero-slider-slide w-slide" style={{ height: "100%" }}>
          <div
            className="k-hero-slider-slide w-slide"
            aria-label="2 of 4"
            role="group"
            style={{
              transition: "all, opacity",
              // transform: "translateX(-1307px)",
              // opacity: 0,
              height: "100%",
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            <div
              className="k-full-container k-container--strech"
              aria-hidden="true"
            >
              <div className="k-hero-side-slider-1" aria-hidden="true">
                <Image
                  src={staticImages.krasnikova}
                  loading="lazy"
                  alt=""
                  className="k-slide-cover-img"
                  style={{
                    // opacity: "0.6",
                    // transform:
                    //   "translate3d(0px, 0px, 0px) scale3d(1.5, 1.5, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="k-slide-image-overlay"
                  style={{
                    // transform:
                    //   "translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                  }}
                  aria-hidden="true"
                />
              </div>
              <div
                id="w-node-_639a5eaa-5c25-0245-1575-e0488fe314f9-861cf97e"
                className="k-hero-right pl-12 flex flex-col justify-center"
                aria-hidden="true"
              >
                <div
                  className="heading-wrapper heading-space-1"
                  aria-hidden="true"
                >
                  <h1 aria-hidden="true">{title}</h1>
                  <div
                    className="k-slide-heading-overlay"
                    style={{
                      // transform:
                      //   "translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div className="para-wrapper" aria-hidden="true">
                  <p
                    className="k-slider-para"
                    style={{
                      opacity: "0.6",
                      // transform:
                      //   "translate3d(0px, 0px, 0px) scale3d(1.3, 1.3, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                    }}
                    aria-hidden="true"
                  >
                    {description}
                  </p>
                  <div
                    className="k-slide-para-overlay"
                    style={{
                      // transform:
                      //   "translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div className="k-button-wrap btn-wrap-1" aria-hidden="true">
                  <Link
                    href="/shop"
                    className="btn w-button"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="k-hero-slider-nav w-slider-nav"></div>
    </div>
  );
};

export default Carousel;
