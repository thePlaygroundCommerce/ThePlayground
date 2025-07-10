"use client";

import Image from "components/Image";
import clsx from "clsx";
import { isImageProps } from "./Hero";
import Heading from "./typography/Heading";
import Link from "next/link";
import Button from "./Button";
import Transition from "components/Transition";
import { loremIpsum } from "lorem-ipsum";
import { Content } from "index";
import { renderContent } from "util/index";
import MuxPlayer from "@mux/mux-player-react";

type ShowcaseProps = Content & {
  flipped?: boolean;
  animate?: {
    delay: number;
  };
};

const Showcase = ({
  animate,
  flipped = false,
  image,
  video,
  content,
  contentStyles: { classes } = {}
}: ShowcaseProps): JSX.Element => {
  const ImageComponent = isImageProps(image) ? <Image {...image} className="w-full" /> : image;
  const VideoComponent = video?.playback_id && (
    <MuxPlayer playbackId={video?.playback_id} autoPlay={true}
      muted={true}
      style={{
        //@ts-ignore
        "--controls": "none", // Hides the entire control bar
        "--play-button": "none",
        "--seek-backward-button": "none",
        "--seek-forward-button": "none",
        "--volume-range": "none",
        "--time-display": "none",
        "--fullscreen-button": "none",
        // Add other specific controls you want to hide explicitly
      }}
    />
  )
  const animationClasses = clsx();
  // animate && "ease-in-out transition-transform transform-opacity"

  //delay-[500ms] delay-[1000ms] delay-[1500ms] delay-[3500ms]

  return (
    <div
      className={clsx(animationClasses, "grid sm:h-full lg:grid-cols-2 gap-4")}
    >
      <Transition>
        {(start: boolean) => (
          <>
            <div
              className={clsx(
                "w-full h-full duration-[2000ms] rounded overflow-hidden",
                animate?.delay && `delay-[${animate.delay}ms]`,
                !start && animate ? "-translate-x-full" : "translate-x-0",
                // classes?.image
              )}
            >
              {VideoComponent || ImageComponent}
            </div>
            <div className={clsx("w-full", flipped && "sm:order-first")}>
              {renderContent(
                content,
                (
                  {
                    headline,
                    title,
                    form,
                    link,
                    linkLabel,
                    description,
                    cta,
                  } = {
                      headline: "",
                      title: "",
                    }
                ) => {
                  description =
                    description ??
                    loremIpsum({
                      count: 4,
                      units: "sentences",
                    });
                  return (
                    <div
                      className={clsx(
                        "w-full duration-[2000ms] delay-[2000ms]",
                        // !start ? "opacity-0" : "opacity-1",
                        animate?.delay && `delay-[${animate.delay + 2000}ms]`,
                        " flex flex-col justify-start md:justify-center md:items-center md:h-full"
                      )}
                    >
                      <div
                        className={clsx(
                          "text-center text-black"
                        )}
                      >
                        <div className="mb-2">
                          {typeof title == "string" ? (
                            <Heading level={3} className="text-sm">
                              {title}
                            </Heading>
                          ) : (
                            title
                          )}
                        </div>
                        <p className="text-sm italic">{headline}</p>
                        <div className="md:w-2/3 md:mx-auto text-center">
                          {typeof description === "string" ? (
                            <p>{description}</p>
                          ) : (
                            description
                          )}
                        </div>
                      </div>
                      {form}
                      {link && (
                        <Link href={link}>
                          <Button variant="primary">
                            {linkLabel || "VIEW MORE"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}
      </Transition>
    </div>
  );
};

export default Showcase;