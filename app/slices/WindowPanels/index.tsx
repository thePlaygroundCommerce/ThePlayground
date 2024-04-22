import { Content, RichTextNodeType } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Button from "components/Button";
import Image from "next/image";

/**
 * Props for `WindowPanels`.
 */
export type WindowPanelsProps = SliceComponentProps<Content.WindowPanelsSlice>;

/**
 * Component for "WindowPanels" Slices.
 */
const WindowPanels = ({ slice }: WindowPanelsProps): JSX.Element => {
  const imageProps = {
    className: "h-full object-cover w-full",
  };
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex h-screen overflow-hidden"
    >
      Yo
      {slice.items.map(
        (
          { window_bg, window_description, window_headline, call_to_action },
          i
        ) => (
          <div
            key={window_bg.id}
            className="m-12 p-6 py-12 h-full basis-1/3 relative flex flex-col"
          >
            <div className="-z-10 w-full h-full absolute overflow-hidden rounded-lg">
              <Image
                {...imageProps}
                alt={window_bg.alt || ""}
                id={window_bg.id || ""}
                src={window_bg.url || ""}
                width={window_bg.dimensions?.width}
                height={window_bg.dimensions?.height}
              />
            </div>
            <div className="p-6">
              <div className="">
                <div className="">
                  <PrismicRichText field={window_headline} />
                </div>
                <div className="">
                  <PrismicRichText field={window_description} />
                </div>
              </div>
              <div>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default WindowPanels;
