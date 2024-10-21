import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Button from "components/Button";
import Image from "components/Image";
import Money from "components/Money";
import Link from "next/link";

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
      className="flex fit-content gap-4 flex-nowrap p-6 py-12 overflow-scroll"
    >
      {slice.items.map(
        (
          { window_bg },
          i
        ) => {

          const imageProps = {
            className: "w-full h-full object-cover",
            alt: window_bg.alt || "",
            id: window_bg.id || "",
            src: window_bg.url || "",
            width: window_bg.dimensions?.width,
            height: window_bg.dimensions?.height,
          };

          return (
            <div
              key={window_bg.id}
              className="flex-none w-full"
            >
              <Window
                imageProps={{ ...imageProps }}
              // window_headline={window_headline}
              // window_description={window_description}
              // call_to_action={call_to_action}
              />
            </div>
          );
        }
      )}
    </section>
  );
};

export const Window = ({
  ...rest
}: Window) => {
  return (
    <div className="relative min-h-96">
      <WindowContent {...rest} />
    </div>
  );
}

export const WindowContent = ({ imageData, contentData: { title, price, headline, link } }: Window) => {
  const { imagefit = "" } = imageData
  return (
    <div className="p-6 grid grid-cols-1">
      <div className="window-header">
      </div>
      <div className="window-body w-full rounded">
        <div className="-z-10 w-full h-full relative rounded-lg overflow-hidden min-h-96">
          <Image {...{ ...imageData, className: `w-full h-full object-${imagefit}`, fill: true }} />
        </div>
      </div>
      <div className="window-footer flex flex-col gap-4 mt-4">
          {/* <PrismicRichText field={name} /> */}
          <p className=" font-black">{title}</p>
          {headline && <p >{headline}</p>}
          {price && <Money number={price} />}
          {/* {link && <Link href={link}><Button>READ NOW</Button></Link>} */}
        {/* {isFilled.link(call_to_action) && (
          <div>
            <Button>Learn More</Button>
          </div>
        )} */}
      </div>
    </div>
  )
}

interface Window {
  imageData: {
    alt: string
    url: string
  }
  contentData: {
    title: string,
    headline: string
    price?: number
    link: string
  }
}

const Review = () => (
  <div></div>
)

const Product = () => (
  <div></div>
)

export default WindowPanels;
