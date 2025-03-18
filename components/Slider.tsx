"use client";
import Heading from "./typography/Heading";
import Slide, { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import { wrapLink } from "util/index";
import clsx from "clsx";
import Transition from "app/Transition";
import { Content, ContentData } from "index";

type Props = {
  slide?: boolean;
  animate?: boolean;
  type: SlideProps["type"];
  title: NonNullable<ContentData>["title"];
  headline: NonNullable<ContentData>["headline"];
  slides: TypeOmittedSlideProps[];
};

const Slider = ({ type, title, headline, slides, slide = false }: Props) => {
  slides = slides.slice(0, 3);
  // delay-[1000ms], delay-[2000ms], delay-[3000ms]

  return (
    <Transition>
      {(start: boolean) => (
        <>
          {(title || headline) && <div className="container mx-auto">
            <Heading level={2}>{title}</Heading>
            <p className="my-4">{headline}</p>
          </div>}
          <div
            className={clsx(
              slide ? "flex-col" : "flex-row flex-nowrap",
              "flex md:flex-row justify-start md:justify-center min-h-96 overflow-x-scroll no-scrollbar gap-6"
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
