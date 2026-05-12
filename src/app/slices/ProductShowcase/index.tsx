import {
  type Content,
  type Client,
  isFilled,
} from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import {
  CtaEmailDocument,
} from "prismicio-types";

import Showcase from "@/components/Showcase";
import { client } from "@/api/clients";
import { isEmpty } from "lodash";
import CtaContent from "../components/content/CtaContent";
import { renderContent, TextContent } from "../components/content";

export type Hero2Props = SliceComponentProps<Content.Hero2Slice>;

const componentToVariationMap = {
  style3: 2,
  style2: 0,
  default: 0,
};

const ProductShowcase = async (props: Hero2Props): Promise<JSX.Element> => {
  let ctaData: Content.CtaEmailDocument;
  const {
    slice: { primary, variation, slice_type },
  } = props

  if (
    isFilled.contentRelationship(primary.call_to_action_link) &&
    primary.call_to_action_link.type == "cta_email" &&
    primary.call_to_action_link.uid
  ) {
    ctaData = await getCta(
      client,
      primary.call_to_action_link.type,
      primary.call_to_action_link.uid
    );
  }

  const isTextPresent = !isEmpty(primary.title || primary.description || primary.headline)
  const isCtaPresent = !isEmpty(primary.call_to_action_label)

  const text = isTextPresent && <TextContent {...{ ...primary, description: <PrismicRichText field={primary.description} /> }} />
  const content = renderContent(primary.content, primary)
  const cta = isCtaPresent && <CtaContent {...{ linkLabel: primary.call_to_action_label }} />

  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="my-8 md:m-0 md:p-12"
    >
      <Showcase {...{
        id: componentToVariationMap[variation],
        text,
        content,
        cta,
        reverse: primary.reverse
      }} />
    </section>
  );
};

export default ProductShowcase;

const getCta = async (
  client: Client<CtaEmailDocument>,
  type: CtaEmailDocument['type'],
  uid: string
) => {
  const cta = await client.getByUID(type, uid);
  return cta;
};

