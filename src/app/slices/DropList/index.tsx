'use client'

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Showcase from "@/components/Showcase";
import Heading from "@/components/typography/Heading";
import clsx from "clsx";
import { PrismicNextImage } from "@prismicio/next";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";

/**
 * Props for `DropList`.
 */
export type DropListProps = SliceComponentProps<Content.DropListSlice>;

/**
 * Component for "DropList" Slices.
 */
const DropList: FC<DropListProps> = (props) => {
  let ctaData: Content.CtaEmailDocument;
  const {
    slice: { primary, variation, slice_type },
  } = props

  // if (
  //   isFilled.contentRelationship(primary.call_to_action_link) &&
  //   primary.call_to_action_link.type == "cta_email" &&
  //   primary.call_to_action_link.uid
  // ) {
  //   ctaData = await getCta(
  //     client,
  //     primary.call_to_action_link.type,
  //     primary.call_to_action_link.uid
  //   );
  // }

  const text = (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-3/4">
        {
          primary.dropitems.map(({ title, description }) => (
            <Disclosure key={title} as="div" className="py-6" >
              {({ open }) => (
                <>
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span className="text-sm/6 font-medium text-black group-data-hover:text-black/80">
                      {title}
                    </span>
                    <FaChevronDown className="size-5 fill-black/60 transition-transform duration-400 ease-in-out group-data-hover:fill-black/50 group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel
                    static
                    className={clsx(
                      "mt-2 overflow-hidden text-sm/5 text-black/50 transition-all duration-400 ease-in-out",
                      open
                        ? "max-h-80 translate-y-0 opacity-100"
                        : "max-h-0 -translate-y-2 opacity-0"
                    )}
                  >
                    <div className="pt-1">{description}</div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))
        }
      </div >
    </div >
  );
  const content = (
    <div className="w-full min-h-[50vh] p-8">
      <PrismicNextImage field={primary.image} className="object-contain w-full h-full rounded-3xl" />
    </div>
  );
  // const cta = <CtaContent {...{ linkLabel: primary.call_to_action_label }} />

  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="p-4 md:p-24"
    >
      <div
        className={clsx(
          "text-center text-black md:w-2/3 mx-auto"
        )}
      >
        <div className="mb-4">
          {typeof primary.title === "string" ? (
            <Heading level={2}>
              {primary.title}
            </Heading>
          ) : (
            primary.title
          )}
        </div>
        <p className="text-sm italic">{primary.headline}</p>
        <div className="text-center text-base mb-12">
          <PrismicRichText field={primary.description} />
        </div>
      </div>
      <Showcase {...{
        text,
        content,
        cta: undefined,
        reverse: false
      }} />
    </section>
  )
};

export default DropList;
