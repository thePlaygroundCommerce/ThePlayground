import {
  type Content,
  isFilled,
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Hero2Slice } from "prismicio-types";
import { ReactNode, createElement } from "react";

export type Hero2Props = SliceComponentProps<Content.Hero2Slice>;
type PrismicImageProps =
  | FilledImageFieldImage
  | EmptyImageFieldImage
  | null
  | undefined;

const Compact = ({ children }: { children: ReactNode }) => (
  <div className="w-full h-full flex justify-end items-center">
    <div className="h-3/4 w-3/4 overflow-hidden rounded-lg border-2">
      {children}
    </div>
  </div>
);
const Window = ({ children }: { children: ReactNode }) => (
  <div className="h-full w-full p-48">{children}</div>
);
const Default = ({ children }: { children: ReactNode }) => (
  <div className="w-full h-full">{children}</div>
);
const componentToVariationMap = {
  compact: Compact,
  window: Window,
  default: Default,
  imageRight: Default,
  textContentLeft: Default,
};

const ProductShowcase = ({ slice }: Hero2Props): JSX.Element => {
  const determineVariation = ({ variation, primary }: Hero2Slice) => {
    let component: any = "div";
    let image;
    const renderImage = (image: PrismicImageProps) => (
      <div className="relative w-full h-full">
        {isFilled.image(image) && (
          <PrismicNextImage
            field={image}
            className="absolute object-cover w-full h-full"
          />
        )}
      </div>
    );

    if (variation !== "textContentLeft") image = primary.image;
    return createElement(
      componentToVariationMap[variation] || <div />,
      null,
      renderImage(image)
    );
  };

  const prepareVisuals = () => {
    let left = determineVariation(slice);
    let right = (
      <div className="es-fullpage-hero__content-right w-full">
        <div className="es-fullpage-hero__content__intro p-6  flex flex-col justify-between h-1/3">
          {isFilled.keyText(slice.primary.eyebrowHeadline) && (
            <p className="es-fullpage-hero__content__intro__eyebrow">
              {slice.primary.eyebrowHeadline}
            </p>
          )}
          <div>
            {isFilled.richText(slice.primary.title) && (
              <div className="es-fullpage-hero__content__intro__headline text-center">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
            {isFilled.richText(slice.primary.description) && (
              <div className="es-fullpage-hero__content__intro__description text-center">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
          </div>
          {isFilled.link(slice.primary.callToActionLink) || (
            <PrismicNextLink
              className="es-call-to-action__link text-center"
              field={slice.primary.callToActionLink || "/"}
            >
              {slice.primary.callToActionLabel ?? "Learn more…"}
            </PrismicNextLink>
          )}
        </div>
      </div>
    );

    return slice.variation !== "imageRight"
      ? [left, right]
      : [left, right].reverse();
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center product-showcase-container"
    >
      {prepareVisuals()}
    </section>
  );
};

export default ProductShowcase;
