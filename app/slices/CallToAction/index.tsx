"use client"

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { callToActionCreateForm } from "api/customerApi";

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
      <h6 className="mb-4 text-white">{description}</h6>
      <form className="text-black" action={callToActionCreateForm}>
        {variation !== "onlyButton" && (
          <input
            type="text"
            name="emailAddress"
            id="emailAddress"
            className="p-2 rounded w-64"
            placeholder={placeholder?.toString()}
          />
        )}
        <button className="text-white p-2 bg-slate-700">
          {primary.action_button_text}
        </button>
      </form>
    </section>
  );
};

export default CallToAction;
