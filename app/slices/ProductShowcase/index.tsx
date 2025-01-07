import {
  type Content,
  type Client,
  isFilled,
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { alignToFlexMapping } from "util/styles";
import CallToActionForm from "components/forms/CallToActionForm";
import {
  CtaEmailDocument,
  Hero2Slice,
} from "prismicio-types";
import { ReactNode, createElement } from "react";
import prismic, { createClient } from "../../../prismicio";
import { AppProps } from "index";
import clsx from "clsx";
import Heading from "components/typography/Heading";
import Showcase from "components/Showcase";

export type Hero2Props = SliceComponentProps<Content.Hero2Slice>;
type PrismicImageProps =
  | FilledImageFieldImage
  | EmptyImageFieldImage
  | null
  | undefined;

const Compact = ({ children, makeFirst }: AppProps & { makeFirst: boolean }) => (
  <div className="w-full h-screen flex justify-center md:justify-end items-center">
    <div className="h-3/4 w-3/4 overflow-hidden rounded-lg border-2">
      {children}
    </div>
  </div>
);
const Window = ({ children, makeFirst }: AppProps & { makeFirst: boolean }) => (
  <div className="h-full w-full p-48">{children}</div>
);
const Default = ({ children, makeFirst }: AppProps & { makeFirst: boolean }) => (
  <div className={clsx("h-screen", makeFirst && "order-first")}>{children}</div>
);
const List = ({ children, key }: AppProps) => (
  <ul className="m-4 list-disc" key={key}>
    {children}
  </ul>
);
const ListItem = ({ children, key }: AppProps) => (
  <li className="" key={key}>
    {children}
  </li>
);
const componentToVariationMap = {
  compact: Compact,
  window: Window,
  default: Default,
  imageRight: Default,
  textContentLeft: Default,
};

const ProductShowcase = async ({
  slice,
  slice: { primary, variation },
}: Hero2Props): Promise<JSX.Element> => {
  let cta: Content.CtaEmailDocument;

  if (
    isFilled.contentRelationship(primary.call_to_action_link) &&
    primary.call_to_action_link.type == "cta_email" &&
    primary.call_to_action_link.uid
  ) {
    cta = await getCta(
      createClient(),
      primary.call_to_action_link.type,
      primary.call_to_action_link.uid
    );
  }


  const renderImage = (image: PrismicImageProps) => (
    <div className={clsx("relative h-full")}>
      {isFilled.image(image) && (
        <PrismicNextImage
          field={image}
          className="absolute object-cover w-full h-full"
        />
      )}
    </div>
  );

  const ImageComponent = createElement(componentToVariationMap[variation] || 'div', { makeFirst: false }, renderImage(primary.image))



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Showcase image={ImageComponent} content={{ ...primary, description: <PrismicRichText field={primary.description} /> }} flipped={false} />
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
