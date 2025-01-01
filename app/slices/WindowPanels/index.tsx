import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
        ) => {

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

export default WindowPanels;
