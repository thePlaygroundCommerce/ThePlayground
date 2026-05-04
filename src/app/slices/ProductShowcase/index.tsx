import {
  type Content,
  type Client,
  isFilled,
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import {
  CtaEmailDocument,
  Hero2Slice,
  Hero2SliceVariation,
  Simplify,
} from "prismicio-types";
import { ComponentProps, ReactNode, createElement } from "react";

import { AppProps, ContentData } from "index";
import clsx from "clsx";
import Heading from "@/components/typography/Heading";
import Showcase from "@/components/Showcase";
import { client } from "@/api/clients";
import Link from "next/link";
import Button from "@/components/Button";
import { loremIpsum } from "lorem-ipsum";
import { isImageProps } from "@/components/Hero";
import Image from "@/components/Image";
import MuxPlayer from "@mux/mux-player-react";
import Card from "@/components/Card";

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

  const text = <TextContent {...{ ...primary, description: <PrismicRichText field={primary.description} /> }} />
  const content = renderContent(primary.content, primary)
  const cta = <CtaContent {...{ linkLabel: primary.call_to_action_label }} />

  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
    >
      <Showcase {...{
        id: componentToVariationMap[variation],
        text,
        content,
        cta,
        flipped: false
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

export const TextContent = (
  {
    headline,
    title,
    form,
    description,
  }: ContentData
) => {
  description =
    description ??
    loremIpsum({
      count: 4,
      units: "sentences",
    });
  return (
    <div
      className={clsx(
        "w-full duration-2000 delay-2000",
        // !start ? "opacity-0" : "opacity-1",
        // animate?.delay && `delay-[${animate.delay + 2000}ms]`,
        " flex flex-col justify-start md:justify-center md:items-center md:h-full"
      )}
    >
      <div
        className={clsx(
          "text-center text-black mb-12"
        )}
      >
        <div className="mb-2">
          {typeof title === "string" ? (
            <Heading level={1}>
              {title}
            </Heading>
          ) : (
            title
          )}
        </div>
        <p className="text-sm italic">{headline}</p>
        <div className="text-center text-xl">
          {typeof description === "string" ? (
            <p>{description}</p>
          ) : (
            description
          )}
        </div>
      </div>
      {form}
    </div>
  );
}

export const CtaContent = ({ linkLabel, link = undefined }) => (
  linkLabel && (
    <div className="w-full">
      <Link href={link ?? ""}>
        <Button className="p-6 rounded-2xl text-lg font-semibold block w-3/4 mx-auto" variant="primary">
          {linkLabel}
        </Button>
      </Link>
    </div>
  )
)

export const renderContent = (contentType: Hero2SliceVariation['primary']['content'], content: Simplify<Content.Hero2SliceDefaultPrimary> | Simplify<Content.Hero2SliceStyle2Primary> | Simplify<Content.Hero2SliceStyle3Primary>) => {
  const createImage = (props: ComponentProps<typeof PrismicNextImage>) => <PrismicNextImage {...props} />

  switch (contentType) {
    case "image":
      return isFilled.image(content.image) && createImage({ field: content.image, className: "object-contain w-full h-full" });
    case "card":
      return (
        <div className="flex gap-8 m-4">
          {content.cards.map(({ title, headline, description }) => {
            const ImageComponent = isFilled.image(content.image) ? createImage({ field: content.image, className: "object-contain w-full h-full" }) : undefined
            return <Card image={ImageComponent} title={title} headline={headline} description={description} />
          })}
        </div>
      )

  }
}

