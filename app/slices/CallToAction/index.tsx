import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CallToActionForm from "components/forms/CallToActionForm";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({
  slice,
  slice: { primary, variation },
}: CallToActionProps): JSX.Element => {
  let description;
  let placeholder;

  if (slice.variation == "default") {
    description = slice.primary.call_description;
    placeholder = slice.primary.form_placeholder_text;
  }

  return (
    <section
      className="m-4"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <CallToActionForm
        description={description}
        primary={primary}
        variation={variation}
        placeholder={placeholder}
      />
    </section>
  );
};

export default CallToAction;
