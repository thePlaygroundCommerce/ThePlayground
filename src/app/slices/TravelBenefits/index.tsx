import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Simplify, TravelBenefitsSliceDefaultPrimaryFeaturesItem } from "prismicio-types";

/**
 * Props for `TravelBenefits`.
 */
export type TravelBenefitsProps =
  SliceComponentProps<Content.TravelBenefitsSlice>;

/**
 * Component for "TravelBenefits" Slices.
 */
const Wrapper: FC<TravelBenefitsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <TravelBenefits overline={slice.primary.overline} features={slice.primary.features} title={slice.primary.title} description={slice.primary.description} />
    </section>
  );
};

export default Wrapper;

export const TravelBenefits = ({ overline, title, description, features }: Content.TravelBenefitsSliceDefaultPrimary & { features: Simplify<TravelBenefitsSliceDefaultPrimaryFeaturesItem>[] }) => {

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2.5rem] bg-zinc-800 p-8 text-white shadow-xl lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            {overline && (
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
                {overline}
              </p>

            )}
            {title && (
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 max-w-2xl text-lg text-cyan-50">
                {description}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((item, index) => (
              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                {item.feature_title && (
                  <p className="text-2xl font-semibold">{item.feature_title}</p>
                )}
                {item.feature_description && (
                  <p className="mt-2 text-sm text-cyan-50">
                    {item.feature_description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}




