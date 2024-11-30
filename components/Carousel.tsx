"use client";

import clsx from "clsx";
import "keen-slider/keen-slider.min.css";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import { Simplify } from "prismicio-types";
import React, { ReactNode, useEffect, useState } from "react";
import { AppProps } from "index";

type Props = {
  active?: number;
  className?: string
  onSlide?: (index: number) => void;
  items?: React.JSX.Element[];
  itemStyles?: {
    styles?: {},
    className?: string
  }
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

const Carousel = ({ itemStyles, items, children, className, onSlide = () => { } }: Props) => {
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
    const value = items ? items : (children &&
      children(instanceRef.current)) ?? []

    return value.map((child, i) => (
      <div key={i} className={clsx(itemStyles?.className, "keen-slider__slide h-full")}>
        {child}
      </div>
    ))
  }

  return (
    <div
      ref={sliderRef}
      className={clsx(className, "keen-slider w-1/3 overflow-hidden")}
    >
      {ready && instanceRef.current && render()}
    </div>
  );
};

export default Carousel;
