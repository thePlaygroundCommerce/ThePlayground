"use client";

import Image from "components/Image";
import clsx from "clsx";
import { Content, isImageProps } from "./Hero";
import Heading from "./typography/Heading";
import Link from "next/link";
import Button from "./Button";
import Transition from "app/Transition";
import { loremIpsum } from 'lorem-ipsum'

type ShowcaseProps = Content & {
  flipped?: boolean; animate?: {
    delay: number
  }
};

const Showcase = ({
  animate,
  flipped = false,
  image,
  content: { headline, title, link, linkLabel, description, cta } = {
    headline: "",
    title: "",
  },
}: ShowcaseProps): JSX.Element => {
  const ImageComponent = isImageProps(image) ? <Image {...image} /> : image;

  const animationClasses = clsx(
    // animate && "ease-in-out transition-transform transform-opacity"
  );
  console.log(flipped)

  description = description ?? loremIpsum({
    count: 4,
    units: "sentences",
  })

  //delay-[500ms] delay-[1000ms] delay-[1500ms] delay-[3500ms]

  return (
    <div className={clsx(animationClasses, "grid md:max-h-screen md:grid-cols-2")}>
      <Transition>
        {(start: boolean) => (
          <>
            <div
              className={clsx(
                "w-full aspect-square md:aspect-video  duration-[2000ms] rounded overflow-hidden",
                animate?.delay && `delay-[${animate.delay}ms]`,
                !start ? "-translate-x-full" : "translate-x-0"
              )}
            >
              {ImageComponent}
            </div>
            <div className={clsx("w-full pt-4", flipped && "md:order-first")}>
              <div
                className={clsx(
                  "w-full duration-[2000ms] delay-[2000ms]",
                  !start ? "opacity-0" : "opacity-1",
                  animate?.delay && `delay-[${animate.delay + 2000}ms]`,
                  " flex flex-col justify-start md:justify-center md:items-center md:h-full"
                )}
              >
                <div className={clsx(flipped ? "text-left": "text-right", "md:text-center")}>
                  {typeof title == "string" ? <Heading>{title}</Heading> : title}
                  <p className="text-sm italic">{headline}</p>
                  <div className="md:w-2/3 md:mx-auto">
                    {typeof description === "string" ? (
                      <p>{description}</p>
                    ) : (
                      description
                    )}
                  </div>
                </div>
                {link && (
                  <Link href={link}>
                    <Button variant="primary">{linkLabel || "VIEW MORE"}</Button>
                  </Link>
                )}
              </div>
            </div >
          </>
        )}
      </Transition>
    </div >
  );
};

export default Showcase;
