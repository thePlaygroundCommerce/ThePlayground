import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SocialMediaLinks`.
 */
export type SocialMediaLinksProps =
  SliceComponentProps<Content.SocialMediaLinksSlice>;

/**
 * Component for "SocialMediaLinks" Slices.
 */
const SocialMediaLinks = ({ slice }: SocialMediaLinksProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      
    </section>
  );
};

export default SocialMediaLinks;
