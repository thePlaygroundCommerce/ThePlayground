import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createCustomer } from "api/customerApi";

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
  // async function create(formData: FormData) {
  //   "use server";
  //   const request: Record<string, FormDataEntryValue> = {};
  //   for (const [key, value] of formData.entries()) {
  //     request[key] = value;
  //   }


  //   const a = await createCustomer(request);
  // }
  let description;
  let placeholder;

  if (slice.variation == "default") {
    description = slice.primary.call_description;
    placeholder = slice.primary.form_placeholder_text;
  }

  return (
    <section
      className="m-4 text-black"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <p className="mb-4 text-white">{description}</p>
      {/* <form action={create}>
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
      </form> */}
    </section>
  );
};

export default CallToAction;
