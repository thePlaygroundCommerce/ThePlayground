import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { client } from "@/api/clients";
import Showcase from "@/components/Showcase";
import { TextContent, CtaContent, renderContent } from "../ProductShowcase";
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
            <Disclosure as="div" className="p-6" >
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-black group-data-hover:text-black/80">
                  {title}
                </span>
                <FaChevronDown className="size-5 fill-black/60 group-data-hover:fill-black/50 group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                {description}
              </DisclosurePanel>
            </Disclosure>
          ))
        }
      </div >
    </div >
  );
  const content = (
    <div className="w-full min-h-[50vh]">
      <PrismicNextImage field={primary.image} className="object-contain w-full h-full" />
    </div>
  );
  // const cta = <CtaContent {...{ linkLabel: primary.call_to_action_label }} />

  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
    >
      <div
        className={clsx(
          "text-center text-black mb-12"
        )}
      >
        <div className="mb-2">
          {typeof primary.title === "string" ? (
            <Heading level={1}>
              {primary.title}
            </Heading>
          ) : (
            primary.title
          )}
        </div>
        <p className="text-sm italic">{primary.headline}</p>
        <div className="text-center text-xl">
          <PrismicRichText field={primary.description} />
        </div>
      </div>
      <Showcase {...{
        text,
        content,
        cta: undefined,
        flipped: false
      }} />
    </section>
  )
};

export default DropList;
