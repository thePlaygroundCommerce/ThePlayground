import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

export type Hero2Props = SliceComponentProps<Content.Hero2Slice>;

const ProductShowcase = ({ slice }: Hero2Props): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center p-16"
    >
      <div>
        <div>
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage
              field={slice.primary.image}
              // alt={slice.primary.image.alt}
              width={500}
              height={500}
              // className="es-fullpage-hero__image"
            />
          )}
        </div>
      </div>
      <div className="es-fullpage-hero__content-right w-1/2">
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
      {/* <div
        // className={`
        //     es-fullpage-hero__content
        //     ${
        //       slice.variation === "imageRight"
        //         ? "es-fullpage-hero__image--right"
        //         : "es-fullpage-hero__image--left"
        //     }
        // `}
      >

        
      </div> */}
    </section>
  );
};

export default ProductShowcase;
