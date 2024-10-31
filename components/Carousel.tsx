"use client";

import "keen-slider/keen-slider.min.css";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import React, { ReactNode, useEffect, useState } from "react";
import { AppProps } from "types";

type Props = {
  active?: number;
  className?: string
  onSlide?: (index: number) => void;
  children: (
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

const Carousel = ({ children, onSlide = () => {} }: Props) => {
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

  return (
    <div
      ref={sliderRef}
      className="keen-slider w-full h-[500px] overflow-hidden"
    >
      {ready &&
        instanceRef.current &&
        (children(instanceRef.current) ?? []).map((child, i) => (
          <div key={i} className="keen-slider__slide w-full h-full">
            {child}
          </div>
        ))}
    </div>
  );
};

export default Carousel;
