import { Description, Field, Input, Label } from "@headlessui/react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Button from "components/Button";
import Heading from "components/typography/Heading";

/**
 * Props for `Newsletter`.
 */
export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

/**
 * Component for "Newsletter" Slices.
 */
const Newsletter = ({ slice, slice: { variation, primary: { title, description, cta_button_text } } }: NewsletterProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-h-144 flex justify-center text-center"
    >
      <div className="w-1/2">
        <div><Heading>{title}</Heading></div>
        <Field >
          <Label></Label>
          <Description>{description}</Description>
          <Input placeholder="Email" className="border m-2 p-2 border-slate-700 rounded-lg" name={`newletter-${variation}`} type="text"/>
        </Field>
        <div>
          <Button>{cta_button_text}</Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
