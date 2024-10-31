import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Window from "components/Window";

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
              {/* <Window
                { ...{ imageProps } }
              // window_headline={window_headline}
              // window_description={window_description}
              // call_to_action={call_to_action}
              /> */}
            </div>
          );
        }
      )}
    </section>
  );
};

const Review = () => (
  <div></div>
)

const Product = () => (
  <div></div>
)

export default WindowPanels;
