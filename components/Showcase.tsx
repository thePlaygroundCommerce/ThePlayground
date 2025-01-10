"use client";

import Image from "components/Image";
import clsx from "clsx";
import { Content, isImageProps } from "./Hero";
import Heading from "./typography/Heading";
import Link from "next/link";
import Button from "./Button";
import Transition from "app/Transition";

type ShowcaseProps = Content & { flipped?: boolean; animate?: boolean };

const Showcase = ({
  animate = false,
  flipped = false,
  image,
  content: { headline, title, link, linkLabel, description, cta } = {
    headline: "",
    title: "",
  },
}: ShowcaseProps): JSX.Element => {
  const ImageComponent = isImageProps(image) ? <Image {...image} /> : image;
  const animationClasses = clsx(
    animate && "ease-in-out transition-transform transform-opacity"
  );

  return (
    <div className={clsx(animationClasses, "grid min-h-screen md:grid-cols-2")}>
      <Transition>
        {(start: boolean) => (
          <div
            className={clsx(
              "w-full duration-[2000ms] delay-1000",
              !start ? "-translate-x-full" : "translate-x-0"
            )}
          >
            {ImageComponent}
          </div>
        )}
      </Transition>
      <div className={clsx("w-full", flipped && "md:order-first")}>
        <Transition>
          {(start: boolean) => (
            <div
              className={clsx(
                "w-full duration-[2000ms] delay-[2000ms]",
                !start ? "opacity-0" : "opacity-1",
                "p-8 flex flex-col justify-center h-full items-center md:items-center"
              )}
            >
              <p>{headline}</p>
              <div className="text-center">
                {typeof title == "string" ? <Heading>{title}</Heading> : title}
                {/* <PrismicRichText field={slice.primary.title} /> */}
              </div>
              <div className={`md:w-2/3 text-left`}>
                {typeof description === "string" ? (
                  <p>{description}</p>
                ) : (
                  description
                )}

                {/* <PrismicRichText
                field={description}
                components={{
                  list: List,
                  listItem: ListItem,
                }}
              /> */}
              </div>
              {link && (
                <Link href={link}>
                  <Button variant="primary">{linkLabel || "VIEW MORE"}</Button>
                </Link>
              )}
              {cta && (
                <div className="text-center m-8 flex">
                  {/* <CallToActionForm
                  buttonText={
                    primary.call_to_action_label ?? cta.data.button_label ?? ""
                  }
                  type={""}
                  id={""}
                  name={""}
                  placeholder={cta.data.placeholder}
                  url={cta.data.url ?? ""}
                /> */}
                  {/* <div className="">
                <Form>
                  <Form.Control className="" name="email" placeholder="Email" />
                </Form>
              </div>
              <div>
                <Button>
                  <PrismicNextLink
                    field={slice.primary.call_to_action_link || "/"}
                  >
                    {slice.primary.call_to_action_label ?? "Learn more…"}
                  </PrismicNextLink>
                </Button>
              </div> */}
                </div>
              )}
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default Showcase;
