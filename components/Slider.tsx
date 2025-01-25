"use client";
import Heading from "./typography/Heading";
import Slide, { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import { Content } from "./Hero";
import { wrapLink } from "util/index";
import clsx from "clsx";
import Transition from "app/Transition";

type Props = {
  slide?: boolean;
  animate?: boolean;
  type: SlideProps["type"];
  title: NonNullable<Content["content"]>["title"];
  headline: NonNullable<Content["content"]>["headline"];
  slides: TypeOmittedSlideProps[];
};

const Slider = ({ type, title, headline, slides, slide = false }: Props) => {
  slides = slides.slice(0, 3);
  // delay-[1000ms], delay-[2000ms], delay-[3000ms]

  return (
    <Transition>
      {(start: boolean) => (
        <>
          <div className="text-center container mx-auto">
            <Heading>{title}</Heading>
            <p className="my-4">{headline}</p>
          </div>
          <div
            className={clsx(
              slide ? "flex-col" : "flex-row flex-nowrap",
              "flex md:flex-row justify-start md:justify-center min-h-96 overflow-x-scroll no-scrollbar"
            )}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={clsx(
                  "basis-4/5 md:basis-1/4 shrink-0 md:shrink ease-in-out transition-transform duration-[1000ms]",
                  `delay-[${i + 1}000ms]`
                  // !start ? "-translate-x-full" : "-translate-x-0"
                )}
              >
                {wrapLink(
                  slide.content.link,
                  <Slide
                    {...{
                      type,
                      ...slide,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </Transition>
  );
};

export default Slider;
