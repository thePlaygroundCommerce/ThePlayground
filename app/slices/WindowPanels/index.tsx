import { Content, isFilled } from "@prismicio/client";
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
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex h-screen"
    >
      {slice.items.map(
        (
          { window_bg, window_description, window_headline, call_to_action },
          i
        ) => {

          const imageProps = {
            className: "h-full object-cover w-full",
            alt: window_bg.alt || "",
            id: window_bg.id || "",
            src: window_bg.url || "",
            width: window_bg.dimensions?.width,
            height: window_bg.dimensions?.height,
          };

          return (
            <div
              key={window_bg.id}
              className="p-6 py-12 basis-1/3 overflow-hidden"
            >
              <Window
                imageProps={{ ...imageProps }}
                window_headline={window_headline}
                window_description={window_description}
                call_to_action={call_to_action}
              />
            </div>
          );
        }
      )}
    </section>
  );
};

const Window = ({
  imageProps,
  window_headline,
  window_description,
  call_to_action,
}) => (
  <div className="relative h-full">
    <div className="-z-10 w-full h-full absolute rounded-lg">
      <Image {...imageProps} />
    </div>
    <div className="p-6">
      <div className="">
        {/* <div className="">
          <PrismicRichText field={window_headline} />
        </div>
        <div className="">
          <PrismicRichText field={window_description} />
        </div> */}
      </div>
      {isFilled.link(call_to_action) && (
        <div>
          <Button>Learn More</Button>
        </div>
      )}
    </div>
  </div>
);

const Review = () => (
  <div></div>
)

const Product = () => (
  <div></div>
)

export default WindowPanels;
