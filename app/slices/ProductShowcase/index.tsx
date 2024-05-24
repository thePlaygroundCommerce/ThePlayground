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
import { createClient } from "../../../prismicio";
import { AppProps } from "types";
import clsx from "clsx";

export type Hero2Props = SliceComponentProps<Content.Hero2Slice>;
type PrismicImageProps =
  | FilledImageFieldImage
  | EmptyImageFieldImage
  | null
  | undefined;

const Compact = ({ children, makeFirst }: { children: ReactNode, makeFirst: boolean }) => (
  <div className="w-full h-screen flex justify-center md:justify-end items-center">
    <div className="h-3/4 w-3/4 overflow-hidden rounded-lg border-2">
      {children}
    </div>
  </div>
);
const Window = ({ children, makeFirst }: { children: ReactNode, makeFirst: boolean }) => (
  <div className="h-full w-full p-48">{children}</div>
);
const Default = ({ children, makeFirst }: { children: ReactNode, makeFirst: boolean }) => (
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
  slice: { variation, primary },
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


  const determineVariation = ({ variation, primary }: Hero2Slice) => {
    let image;
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

    if (variation !== "textContentLeft") image = primary.image;
    return createElement<{
      makeFirst: boolean;
    }>(
      //@ts-ignore
      componentToVariationMap[variation] || <div />,
      {
        makeFirst: false
      },
      renderImage(image)
    );
  };

  const prepareVisuals = async () => {
    let descriptionAlignment = slice.primary.description_align ?? "";

    let left = determineVariation(slice);
    let right = (
      <div className={clsx("w-full", slice.variation == "imageRight" && "md:order-first")}>
        <div
          className={`p-8 flex flex-col justify-center h-full items-center md:items-${alignToFlexMapping[descriptionAlignment]}`}
        >
          {isFilled.keyText(slice.primary.eyebrowHeadline) && (
            <p>{slice.primary.eyebrowHeadline}</p>
          )}
          {isFilled.richText(slice.primary.title) && (
            <div className="">
              <PrismicRichText field={slice.primary.title} />
            </div>
          )}
          {isFilled.richText(slice.primary.description) && (
            <div className={`w-2/3 text-${slice.primary.description_align}`}>
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  list: List,
                  listItem: ListItem,
                }}
              />
            </div>
          )}
          {cta && (
            <div className="text-center m-8 flex">
              <CallToActionForm
                buttonText={
                  primary.call_to_action_label ?? cta.data.button_label ?? ""
                }
                type={""}
                id={""}
                name={""}
                placeholder={cta.data.placeholder}
                url={cta.data.url ?? ""}
              />
              {/* <div className="">
                <Form>
                  <Form.Control className="" name="email" placeholder="Email" />
                </Form>
              </div>
              <div>
                <Button>
                  <PrismicNextLink
                    field={slice.primary.call_to_action_link || "/"}
                  >
                    {slice.primary.call_to_action_label ?? "Learn more…"}
                  </PrismicNextLink>
                </Button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    );

      return <>{left}{right}</>
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid min-h-screen md:grid-cols-2"
    >
      {prepareVisuals()}
    </section>
  );
};

export default ProductShowcase;

const getCta = async (
  client: Client<CtaEmailDocument>,
  type: any,
  uid: string
) => {
  const cta = await client.getByUID(type, uid);
  return cta;
};
